FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# -u enables unbuffered output for standard python logs
CMD ["python", "-u", "main.py"]
