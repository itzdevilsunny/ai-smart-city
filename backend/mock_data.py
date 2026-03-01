import random
import json
import time
from datetime import datetime, timedelta

# Center coordinates (e.g., Downtown San Francisco)
BASE_LAT = 37.7749
BASE_LNG = -122.4194

ISSUE_TYPES = ["Pothole", "Streetlight Out", "Garbage Overflow", "Water Leak"]

def generate_mock_data(num_records=50):
    data = []
    for _ in range(num_records):
        record = {
            "id": f"UP-{random.randint(1000, 9999)}",
            "type": random.choice(ISSUE_TYPES),
            "lat": BASE_LAT + random.uniform(-0.05, 0.05),
            "lng": BASE_LNG + random.uniform(-0.05, 0.05),
            "severity": random.randint(1, 10), # 10 is critical
            "timestamp": (datetime.now() - timedelta(minutes=random.randint(1, 1440))).isoformat(),
            "status": "Predicted" if random.random() > 0.7 else "Reported"
        }
        data.append(record)
    return data

if __name__ == "__main__":
    # Generate and save to a JSON file to serve as our fake database
    mock_db = generate_mock_data(100)
    with open("database.json", "w") as f:
        json.dump(mock_db, f, indent=4)
    print("✅ Generated 100 mock urban incidents!")
