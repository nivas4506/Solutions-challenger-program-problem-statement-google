from fastapi import FastAPI, UploadFile, File, BackgroundTasks
import boto3
import json
from kafka import KafkaProducer
import os
import uuid

app = FastAPI(title="Media Ingestion Service", version="1.0.0")

# Configurations
S3_ENDPOINT = os.getenv("S3_ENDPOINT", "http://localhost:9000")
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY", "admin")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY", "password123")
S3_BUCKET = os.getenv("S3_BUCKET", "raw-media")

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9093")
KAFKA_TOPIC = os.getenv("KAFKA_TOPIC", "asset-uploads")

# Initialize S3 Client (Minio)
s3_client = boto3.client(
    's3',
    endpoint_url=S3_ENDPOINT,
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY
)

# Connect to Kafka
try:
    producer = KafkaProducer(
        bootstrap_servers=[KAFKA_BROKER],
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
except Exception as e:
    producer = None
    print(f"Warning: Failed to connect to Kafka at startup: {e}")

@app.on_event("startup")
def startup_event():
    # Ensure S3 bucket exists
    try:
        s3_client.head_bucket(Bucket=S3_BUCKET)
    except:
        try:
            s3_client.create_bucket(Bucket=S3_BUCKET)
            print(f"Created initial bucket: {S3_BUCKET}")
        except Exception as e:
            print(f"Warning: Minio bucket creation failed: {e}")

def process_upload(file_data: bytes, filename: str, asset_id: str, client_id: str):
    # Upload Object to S3
    s3_key = f"{client_id}/{asset_id}/{filename}"
    s3_client.put_object(Bucket=S3_BUCKET, Key=s3_key, Body=file_data)
    
    # Publish 'Asset Uploaded' event to Kafka
    if producer:
        event = {
            "asset_id": asset_id,
            "client_id": client_id,
            "s3_bucket": S3_BUCKET,
            "s3_key": s3_key,
            "status": "UPLOADED"
        }
        producer.send(KAFKA_TOPIC, event)
        producer.flush()

@app.post("/upload/")
async def upload_media(client_id: str, background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Receives massive video chunk, tosses to S3, and fires Kafka Event."""
    asset_id = str(uuid.uuid4())
    file_data = await file.read()
    
    # Process heavy upload asynchronously
    background_tasks.add_task(process_upload, file_data, file.filename, asset_id, client_id)
    
    return {"asset_id": asset_id, "status": "processing", "message": f"Ingestion started for {file.filename}"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
