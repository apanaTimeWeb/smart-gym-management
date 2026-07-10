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
    response = session.post(f"{api_url}/v1/auth/login", json={
        "email": "admin@gymsmart.com",
        "password": "superadmin123"
    })
    # If the server is not running, this will fail.
    # We gracefully skip or just return None (the test will fail later)
    if response.status_code == 201:
        return response.json().get("data", {}).get("accessToken")
    return None

@pytest.fixture
def auth_client(api_client, admin_token):
    """Fixture to provide a requests session with the Authorization header set."""
    if admin_token:
        api_client.headers.update({
            "Authorization": f"Bearer {admin_token}"
        })
    return api_client
