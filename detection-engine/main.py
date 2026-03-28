import os
import json
import time
import numpy as np
from kafka import KafkaConsumer, KafkaProducer
from qdrant_client import QdrantClient

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9093")
INPUT_TOPIC = os.getenv("INPUT_TOPIC", "suspect-media")
OUTPUT_TOPIC = os.getenv("OUTPUT_TOPIC", "violations")

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
COLLECTION_NAME = "asset_fingerprints"
VECTOR_SIZE = 128

# Connect to Qdrant
qdrant_client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

def extract_fingerprint(suspect_video_bytes: bytes) -> list[float]:
    # Mocking extraction of vector from suspected video chunk
    return np.random.rand(VECTOR_SIZE).tolist()

def run_service():
    print("Starting Detection Engine...")
    
    while True:
        try:
            consumer = KafkaConsumer(
                INPUT_TOPIC,
                bootstrap_servers=[KAFKA_BROKER],
                auto_offset_reset='earliest',
                enable_auto_commit=True,
                group_id='detection-group',
                value_deserializer=lambda x: json.loads(x.decode('utf-8'))
            )
            producer = KafkaProducer(
                bootstrap_servers=[KAFKA_BROKER],
                value_serializer=lambda v: json.dumps(v).encode('utf-8')
            )
            break
        except Exception as e:
            print(f"Waiting for Kafka... {e}")
            time.sleep(5)

    print("Detection Engine listening for suspect media...")
    for message in consumer:
        event = message.value
        platform = event.get('platform')
        suspect_url = event.get('suspect_url')
        
        print(f"Analyzing suspect media from {platform}...")
        
        try:
            # 1. Generate fingerprint for suspected media
            suspect_embedding = extract_fingerprint(b"fake_bytes")
            
            # 2. Search Qdrant for a match
            # Since vectors are random in this mock, we'll force a probability match 30% of the time for demo logging
            is_match = np.random.rand() > 0.7
            
            try:
                search_result = qdrant_client.search(
                    collection_name=COLLECTION_NAME,
                    query_vector=suspect_embedding,
                    limit=1,
                    score_threshold=0.85 # 85% similarity threshold
                )
                if search_result: is_match = True
            except:
                search_result = []

            
            if is_match:
                print(f"🚨 PIRACY DETECTED: Match found for stream on {platform}!")
                
                matched_asset_id = search_result[0].payload['asset_id'] if search_result else "mock-asset-123"
                client_id = search_result[0].payload['client_id'] if search_result else "mock-client"
                
                violation_event = {
                    "asset_id": matched_asset_id,
                    "client_id": client_id,
                    "suspect_url": suspect_url,
                    "platform": platform,
                    "confidence_score": 0.98,
                    "detected_at": time.time()
                }
                
                producer.send(OUTPUT_TOPIC, violation_event)
                producer.flush()
            else:
                print(f"✓ Stream from {platform} is clean (No matches found).")
                
        except Exception as e:
            print(f"Error analyzing stream from {platform}: {e}")

if __name__ == "__main__":
    run_service()
