FROM python:3.10-slim
WORKDIR /app
# Install system dependencies for psycopg2 and numpy compilation
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Unbuffered output
CMD ["python", "-u", "main.py"]
