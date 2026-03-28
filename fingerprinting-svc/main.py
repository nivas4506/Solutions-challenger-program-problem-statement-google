import os
import json
import time
import uuid
import numpy as np
from kafka import KafkaConsumer, KafkaProducer
import boto3
import psycopg2
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9093")
INPUT_TOPIC = os.getenv("INPUT_TOPIC", "asset-watermarked")
OUTPUT_TOPIC = os.getenv("OUTPUT_TOPIC", "asset-fingerprinted")

S3_ENDPOINT = os.getenv("S3_ENDPOINT", "http://localhost:9000")
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY", "admin")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY", "password123")
S3_BUCKET = os.getenv("S3_BUCKET", "raw-media")

PG_HOST = os.getenv("PG_HOST", "localhost")
PG_USER = os.getenv("PG_USER", "admin")
PG_PASSWORD = os.getenv("PG_PASSWORD", "password")
PG_DB = os.getenv("PG_DB", "digital_asset_db")

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
COLLECTION_NAME = "asset_fingerprints"
VECTOR_SIZE = 128

s3_client = boto3.client('s3', endpoint_url=S3_ENDPOINT, 
                         aws_access_key_id=S3_ACCESS_KEY, 
                         aws_secret_access_key=S3_SECRET_KEY)

# Connect to Qdrant
qdrant_client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

def init_dbs():
    # PostgreSQL init
    with psycopg2.connect(host=PG_HOST, user=PG_USER, password=PG_PASSWORD, dbname=PG_DB) as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS Assets (
                    id VARCHAR(255) PRIMARY KEY,
                    client_id VARCHAR(255),
                    s3_watermarked_key TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
        conn.commit()

    # Qdrant init
    collections = qdrant_client.get_collections().collections
    if not any(c.name == COLLECTION_NAME for c in collections):
        qdrant_client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE),
        )

def generate_fingerprint(video_data: bytes) -> list[float]:
    # MOCK M/L PROCESS: Replace with PyTorch ResNet50 for frame extraction
    return np.random.rand(VECTOR_SIZE).tolist()

def run_service():
    print(f"Starting Fingerprinting Service...")
    
    # Wait for DBs and Kafka
    while True:
        try:
            init_dbs()
            consumer = KafkaConsumer(
                INPUT_TOPIC,
                bootstrap_servers=[KAFKA_BROKER],
                auto_offset_reset='earliest',
                enable_auto_commit=True,
                group_id='fingerprint-group',
                value_deserializer=lambda x: json.loads(x.decode('utf-8'))
            )
            producer = KafkaProducer(
                bootstrap_servers=[KAFKA_BROKER],
                value_serializer=lambda v: json.dumps(v).encode('utf-8')
            )
            break
        except Exception as e:
            print(f"Waiting for dependencies... {e}")
            time.sleep(5)

    print("Connected! Polling for watermarked media...")
    for message in consumer:
        event = message.value
        asset_id = event.get('asset_id')
        client_id = event.get('client_id')
        s3_key = event.get('s3_watermarked_key')
        
        try:
            # 1. Download watermarked video to analyze
            response = s3_client.get_object(Bucket=S3_BUCKET, Key=s3_key)
            raw_data = response['Body'].read()
            
            # 2. Generate fingerprint vector
            embedding = generate_fingerprint(raw_data)
            
            # 3. Save Metadata to PostgreSQL
            with psycopg2.connect(host=PG_HOST, user=PG_USER, password=PG_PASSWORD, dbname=PG_DB) as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO Assets (id, client_id, s3_watermarked_key) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING",
                        (asset_id, client_id, s3_key)
                    )
                conn.commit()

            # 4. Save Vector to Qdrant Vector DB
            qdrant_client.upsert(
                collection_name=COLLECTION_NAME,
                points=[
                    PointStruct(
                        id=str(uuid.uuid4()),  # Qdrant supports UUIDs for fast indexing
                        vector=embedding,
                        payload={"asset_id": asset_id, "client_id": client_id}
                    )
                ]
            )
            
            # 5. Fire completion event
            producer.send(OUTPUT_TOPIC, {**event, "status": "FINGERPRINTED"})
            producer.flush()
            print(f"Successfully fingerprinted asset {asset_id} and stored in databases.")
            
        except Exception as e:
            print(f"Error processing {asset_id}: {e}")

if __name__ == "__main__":
    run_service()
