from flask import Flask

app = Flask(__name__)


@app.get("/api/hello")
def hello():
    return {"msg": "hello; GMX Fisch see below"}


@app.get("/api/health")
def health():
    # Used by the Kubernetes readiness and liveness probes.
    return {"status": "ok"}


if __name__ == "__main__":
    # Local development only. In the container, gunicorn imports `app` and never runs this block.
    # Port 5001, not 5000: on macOS the AirPlay Receiver already listens on 5000 and answers with 403.
    app.run(port=5001, debug=True)
