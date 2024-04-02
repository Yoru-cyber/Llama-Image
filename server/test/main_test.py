from fastapi.testclient import TestClient
import sys
sys.path.append("../")
from main import app

client = TestClient(app)
def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "You are in the root. If you read this everything works alright. Go to /docs for documentation"}
