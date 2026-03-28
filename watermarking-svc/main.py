import os
import json
import time
from kafka import KafkaConsumer, KafkaProducer
import boto3

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9093")
INPUT_TOPIC = os.getenv("INPUT_TOPIC", "asset-uploads")
OUTPUT_TOPIC = os.getenv("OUTPUT_TOPIC", "asset-watermarked")

S3_ENDPOINT = os.getenv("S3_ENDPOINT", "http://localhost:9000")
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY", "minioadmin")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY", "minioadmin")
S3_BUCKET = os.getenv("S3_BUCKET", "raw-media")

s3_client = boto3.client('s3', endpoint_url=S3_ENDPOINT, 
                         aws_access_key_id=S3_ACCESS_KEY, 
                         aws_secret_access_key=S3_SECRET_KEY)

def apply_watermark(file_data: bytes, client_id: str) -> bytes:
    # MOCK WATERMARKING: Normally runs OpenCV/FFmpeg steganography.
    watermark = f"---WATERMARK:{client_id}---".encode('utf-8')
    return file_data + watermark

def run_service():
    print(f"Starting Watermarking Service. Listening on {KAFKA_BROKER} topic {INPUT_TOPIC}")
    
    # Block until Kafka is ready
    while True:
        try:
            consumer = KafkaConsumer(
                INPUT_TOPIC,
                bootstrap_servers=[KAFKA_BROKER],
                auto_offset_reset='earliest',
                enable_auto_commit=True,
                group_id='watermark-group',
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

    print("Connected to Kafka! Polling for new media...")
    for message in consumer:
        event = message.value
        print(f"Got ingestion event: {event}")
        
        asset_id = event.get('asset_id')
        client_id = event.get('client_id')
        s3_key = event.get('s3_key')
        
        try:
            # 1. Download raw media
            response = s3_client.get_object(Bucket=S3_BUCKET, Key=s3_key)
            raw_data = response['Body'].read()
            
            # 2. Apply watermark
            watermarked_data = apply_watermark(raw_data, client_id)
            
            # 3. Upload watermarked media
            new_s3_key = f"{client_id}/{asset_id}/watermarked.bin"
            s3_client.put_object(Bucket=S3_BUCKET, Key=new_s3_key, Body=watermarked_data)
            
            # 4. Dispatch new event
            new_event = {
                "asset_id": asset_id,
                "client_id": client_id,
                "s3_bucket": S3_BUCKET,
                "s3_watermarked_key": new_s3_key,
                "status": "WATERMARKED"
            }
            producer.send(OUTPUT_TOPIC, new_event)
            producer.flush()
            print(f"Successfully processed and watermarked asset {asset_id}")
            
        except Exception as e:
            print(f"Error processing {asset_id}: {e}")

if __name__ == "__main__":
    run_service()
