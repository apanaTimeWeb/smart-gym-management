import pytest
import requests

BASE_URL = "http://localhost:5000/api/v1"

@pytest.fixture
def auth_headers():
    """Get a valid token for tests."""
    response = requests.post(f"{BASE_URL}/auth/login", json={
        "email": "admin@gymsmart.com",
        "password": "admin"
    })
    token = response.json().get('data', {}).get('accessToken')
    return {"Authorization": f"Bearer {token}"}

def test_get_sales_overview(auth_headers):
    response = requests.get(f"{BASE_URL}/sales/overview", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "monthlyRevenue" in data["data"]

def test_get_membership_report(auth_headers):
    response = requests.get(f"{BASE_URL}/sales/membership-report", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "report" in data["data"]
    assert "totals" in data["data"]

def test_get_pending_payments(auth_headers):
    response = requests.get(f"{BASE_URL}/sales/pending-payments?limit=10&page=1", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "members" in data["data"]
    assert "total" in data["data"]

def test_get_all_memberships(auth_headers):
    response = requests.get(f"{BASE_URL}/sales/all-memberships?limit=10&page=1", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "members" in data["data"]
    assert "total" in data["data"]
