import pytest

from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_hello_returns_message(client):
    response = client.get("/api/hello")

    assert response.status_code == 200
    assert response.get_json() == {"msg": "hello; GMX Fisch see below"}


def test_health_reports_ok(client):
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}


# Failure cases (REQ7): the API must answer wrong requests with the correct status code.

def test_unknown_endpoint_returns_404(client):
    response = client.get("/api/does-not-exist")

    assert response.status_code == 404


def test_wrong_method_returns_405(client):
    response = client.post("/api/hello")

    assert response.status_code == 405
