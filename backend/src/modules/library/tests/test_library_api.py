import pytest
import requests

BASE_URL = "http://localhost:5000/api/v1"

@pytest.fixture
def auth_headers():
    response = requests.post(f"{BASE_URL}/auth/login", json={
        "email": "admin@gymsmart.com",
        "password": "admin"
    })
    token = response.json().get('data', {}).get('accessToken')
    return {"Authorization": f"Bearer {token}"}

def test_get_exercises(auth_headers):
    response = requests.get(f"{BASE_URL}/library/exercises", headers=auth_headers)
    assert response.status_code == 200

def test_get_diet_plans(auth_headers):
    response = requests.get(f"{BASE_URL}/library/diet-plans", headers=auth_headers)
    assert response.status_code == 200
