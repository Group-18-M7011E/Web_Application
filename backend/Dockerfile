FROM python:3.12-slim

WORKDIR /app

# Install dependencies first so this layer is cached when only the code changes.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

# Run as an unprivileged user. A numeric UID lets Kubernetes verify runAsNonRoot.
RUN useradd --uid 10001 --no-create-home app
USER 10001

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "app:app"]
