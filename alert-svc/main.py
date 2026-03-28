import os
import json
import time
from kafka import KafkaConsumer

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9093")
INPUT_TOPIC = os.getenv("INPUT_TOPIC", "violations")

def send_alert(violation):
    print("="*60)
    print("🚨 [URGENT ALERT] PIRACY VIOLATION DETECTED 🚨")
    print(f"Asset ID   : {violation.get('asset_id')}")
    print(f"Platform   : {violation.get('platform')}")
    print(f"Suspect URL: {violation.get('suspect_url')}")
    print(f"Confidence : {violation.get('confidence_score')}")
    print("="*60)
    # Mocking a webhook to Slack/Email
    print("=> Dispatched Takedown Webhook to Legal Team via API.\n")

def run_service():
    print("Alert Service Starting...")
    while True:
        try:
            consumer = KafkaConsumer(
                INPUT_TOPIC,
                bootstrap_servers=[KAFKA_BROKER],
                auto_offset_reset='earliest',
                enable_auto_commit=True,
                group_id='alert-group',
                value_deserializer=lambda x: json.loads(x.decode('utf-8'))
            )
            break
        except Exception as e:
            print(f"Waiting for Kafka... {e}")
            time.sleep(5)
            
    print("Listening for violations on topic:", INPUT_TOPIC)
    for message in consumer:
        violation_event = message.value
        send_alert(violation_event)

if __name__ == "__main__":
    run_service()
