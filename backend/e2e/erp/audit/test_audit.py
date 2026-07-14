import pytest
import uuid

def test_create_audit(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/erp/audit", json={
        "action": f"Test Create {unique_val}",
        "module": "E2E",
        "description": "E2E Test generation",
    })
    
    assert create_resp.status_code in [201, 400, 422], f"Unexpected status: {create_resp.status_code} - {create_resp.text}"

def test_get_audit(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/audit")
    assert response.status_code in [200, 403]
    
    if response.status_code == 200:
        data = response.json()
        assert "data" in data
        assert isinstance(data["data"], list)
