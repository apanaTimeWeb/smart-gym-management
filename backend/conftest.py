import pytest
import requests
import os

# Assuming NestJS runs locally on port 5000 during tests
# For enterprise apps, you might fetch this from environment variables
BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000/api")

@pytest.fixture(scope="session")
def api_url():
    """Fixture to provide the base API URL."""
    return BASE_URL

@pytest.fixture
def api_client():
    """Fixture to provide a requests session for making API calls."""
    session = requests.Session()
    # You can add default headers here if needed
    session.headers.update({
        "Content-Type": "application/json"
    })
    return session

@pytest.fixture(scope="session")
def admin_token(api_url):
    """Fixture to obtain an admin JWT token for authenticated requests."""
    session = requests.Session()
    response = session.post(f"{api_url}/auth/login", json={
        "email": "admin@gymsmart.com",
        "password": "superadmin123"
    })
    # If the server is not running, this will fail.
    # We gracefully skip or just return None (the test will fail later)
    if response.status_code == 201:
        return response.json().get("data", {}).get("accessToken")
    return None

@pytest.fixture(scope="session")
def test_tenant_id(api_client, api_url, admin_token):
    """Fixture to create a completely new test tenant DB for isolated testing."""
    if not admin_token:
        return "test-tenant-id"
    
    api_client.headers.update({"Authorization": f"Bearer {admin_token}"})
    
    # Create a fresh Gym/Tenant
    import uuid
    unique_val = f"e2e_{uuid.uuid4().hex[:8]}"
    response = api_client.post(f"{api_url}/superadmin/gyms", json={
        "name": f"E2E Test DB {unique_val}",
        "email": f"{unique_val}@e2e.com",
        "phone": "+1234567890",
        "planId": "pro",
        "ownerName": "E2E Tester",
        "ownerEmail": f"{unique_val}@e2e.com",
        "status": "ACTIVE"
    })
    
    if response.status_code == 201:
        tenant_id = response.json().get("data", {}).get("id")
        return tenant_id
        
    return "test-tenant-id"

@pytest.fixture
def auth_client(api_client, admin_token, test_tenant_id):
    """Fixture to provide a requests session with Auth and the isolated test DB header."""
    if admin_token:
        api_client.headers.update({
            "Authorization": f"Bearer {admin_token}",
            "x-tenant-id": test_tenant_id
        })
    return api_client
