import pytest
import requests
import os

# Assuming NestJS runs locally on port 5000 during tests
# For enterprise apps, you might fetch this from environment variables
BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000")

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
