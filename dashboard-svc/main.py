from fastapi import FastAPI
import os
import json
import time
import threading
from kafka import KafkaConsumer
import clickhouse_connect

app = FastAPI(title="Analytics Dashboard API")

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9093")
VIOLATIONS_TOPIC = os.getenv("VIOLATIONS_TOPIC", "violations")
CLICKHOUSE_HOST = os.getenv("CLICKHOUSE_HOST", "clickhouse")

ck_client = None

def init_clickhouse():
    global ck_client
    while True:
        try:
            ck_client = clickhouse_connect.get_client(host=CLICKHOUSE_HOST, port=8123)
            # Create telemetry table optimized for analytical queries
            ck_client.command("""
                CREATE TABLE IF NOT EXISTS PiracyTelemetry (
                    timestamp DateTime,
                    asset_id String,
                    client_id String,
                    platform String,
                    confidence Float32
                ) ENGINE = MergeTree()
                ORDER BY timestamp
            """)
            print("Connected to ClickHouse.")
            break
        except Exception as e:
            print(f"Waiting for ClickHouse... {e}")
            time.sleep(5)

def consume_telemetry():
    while True:
        try:
            consumer = KafkaConsumer(
                VIOLATIONS_TOPIC,
                bootstrap_servers=[KAFKA_BROKER],
                auto_offset_reset='earliest',
                enable_auto_commit=True,
                group_id='dashboard-group',
                value_deserializer=lambda x: json.loads(x.decode('utf-8'))
            )
            break
        except Exception as e:
            time.sleep(5)
            
    print("Dashboard telemetry listener connected to Kafka...")
    for msg in consumer:
        event = msg.value
        try:
            if ck_client:
                timestamp = int(event.get('detected_at', time.time()))
                ck_client.insert(
                    'PiracyTelemetry',
                    [[
                        timestamp, 
                        event.get('asset_id'), 
                        event.get('client_id'), 
                        event.get('platform'), 
                        event.get('confidence_score')
                    ]],
                    column_names=['timestamp', 'asset_id', 'client_id', 'platform', 'confidence']
                )
                print(f"Logged telemetry for asset {event.get('asset_id')} to ClickHouse.")
        except Exception as e:
            print(f"Failed to write to ClickHouse DB: {e}")

@app.on_event("startup")
def startup():
    threading.Thread(target=init_clickhouse, daemon=True).start()
    threading.Thread(target=consume_telemetry, daemon=True).start()

@app.get("/stats")
def get_stats():
    """REST endpoint for the Frontend React App"""
    if not ck_client:
        return {"error": "ClickHouse Database linking..."}
    
    total = ck_client.query("SELECT COUNT() FROM PiracyTelemetry").result_rows[0][0]
    platforms = ck_client.query("SELECT platform, COUNT() FROM PiracyTelemetry GROUP BY platform").result_rows
    
    return {
        "status": "online",
        "total_violations_detected": total,
        "platform_breakdown": [{"platform": p[0], "count": p[1]} for p in platforms]
    }
