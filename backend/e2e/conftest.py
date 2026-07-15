from http import HTTPStatus
import pytest
import requests
import os

# Assuming NestJS runs locally on port 5000 during tests
# For enterprise apps, you might fetch this from environment variables
BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000/api/v1")

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
        "email": "demo_admin@gym.com",
        "password": "demo123"
    })
    # If the server is not running, this will fail.
    # We gracefully skip or just return None (the test will fail later)
    if response.status_code == HTTPStatus.OK:
        return response.json().get("data", {}).get("accessToken")
    return None

@pytest.fixture(scope="session")
def test_tenant_id(api_url, admin_token):
    """Fixture to create a completely new test tenant DB for isolated testing."""
    if not admin_token:
        yield "test-tenant-id"
        return
    
    api_client = requests.Session()
    api_client.headers.update({"Authorization": f"Bearer {admin_token}"})
    
    # Create a fresh Gym/Tenant
    import uuid
    unique_val = f"e2e_{uuid.uuid4().hex[:8]}"
    response = api_client.post(f"{api_url}/superadmin/gyms", json={
        "name": f"E2E Test DB {unique_val}",
        "adminEmail": f"{unique_val}@e2e.com",
        "phone": "+1234567890",
        "plan": "pro",
        "ownerName": "E2E Tester",
        "memberCount": 0,
        "monthlyRevenue": 0,
        "databaseVersion": "1.0",
        "status": "ACTIVE",
        "temporaryPassword": "temp"
    })
    
    tenant_id = "test-tenant-id"
    if response.status_code == HTTPStatus.CREATED:
        tenant_id = response.json().get("data", {}).get("id")
        
    yield tenant_id
    
    # Teardown logic
    if tenant_id != "test-tenant-id":
        api_client.delete(f"{api_url}/superadmin/gyms/{tenant_id}?hardDelete=true")

@pytest.fixture
def auth_client(api_client, admin_token, test_tenant_id):
    """Fixture to provide a requests session with Auth and the isolated test DB header."""
    if admin_token:
        api_client.headers.update({
            "Authorization": f"Bearer {admin_token}",
            "x-tenant-id": test_tenant_id
        })
    return api_client
