from flask import Flask, send_from_directory
app = Flask(__name__)

@app.route("/api/hello")
def hello():
    return {"msg": "hello; GMX Fisch see below"}

if __name__ == "__main__":
    # local dev only: gunicorn in the cluster never runs this block
    @app.route("/")
    def index():
        return send_from_directory("../frontend", "index.html")

    @app.route("/<path:p>")
    def static_files(p):
        return send_from_directory("../frontend", p)

    app.run(port=5000, debug=True)