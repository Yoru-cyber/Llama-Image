from fastapi.testclient import TestClient
import sys

sys.path.append("../")
from main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "Hello": "You are in the root. If you read this everything works alright. Go to /docs for documentation"
    }


def test_scale():
    response = client.post(
        "scale",
        params={"scaling": 2},
        files={
            "user_image": ("test.png", open("test/mockup/test.png", "rb"), "image/png")
        },
    )
    assert response.status_code == 200
    server_response = response.json()
    assert server_response["status_code"] == 201
    assert server_response["message"] == "Object created"
    assert type(server_response["path"]) == str


def test_convert():
    response = client.post(
        "convert",
        params={"type": "png"},
        files={
            "user_image": ("test.png", open("test/mockup/test.png", "rb"), "image/png")
        },
    )
    assert response.status_code == 200
    server_response = response.json()
    assert server_response["status_code"] == 201
    assert server_response["message"] == "Object created"
    assert type(server_response["path"]) == str
