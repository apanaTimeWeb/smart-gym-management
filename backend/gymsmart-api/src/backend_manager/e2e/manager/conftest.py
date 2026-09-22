import os
import pytest
import requests

@pytest.fixture
def api_base_url():
    return os.getenv("API_BASE_URL", "")

@pytest.fixture
def auth_headers():
    token=os.getenv("E2E_ACCESS_TOKEN", "")
    tenant=os.getenv("E2E_TENANT_ID", "")
    if not token or not tenant:
        pytest.skip("Live E2E credentials are required; no fake/mock pass is used.")
    return {"Authorization":f"Bearer {token}","x-tenant-id":tenant}

def assert_envelope(response):
    body=response.json()
    assert body["message"]
    assert "success" in body and "data" in body
    assert body["data"] is not None if body["success"] else body["data"] is None
    return body
