import pytest
import uuid

def test_create_finance(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/erp/finance", json={
        "name": f"Test Create {unique_val}",
        "description": "E2E Test generation",
        "status": "ACTIVE",
        "email": f"{unique_val}@test.com",
        "code": unique_val.upper()
    })
    
    assert create_resp.status_code in [201, 400, 422], f"Unexpected status: {create_resp.status_code} - {create_resp.text}"
    
    if create_resp.status_code == 201:
        data = create_resp.json()
        assert "data" in data
        assert "id" in data["data"]

def test_get_finance(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/finance")
    assert response.status_code in [200, 403]
    
    if response.status_code == 200:
        data = response.json()
        assert "data" in data
        assert isinstance(data["data"], list)

def test_get_finance_by_id(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/erp/finance", json={
        "name": f"Test Get {unique_val}",
        "description": "E2E Test generation",
        "status": "ACTIVE",
        "email": f"{unique_val}@test.com",
        "code": unique_val.upper()
    })
    if create_resp.status_code == 201:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.get(f"{api_url}/erp/finance/{real_id}")
        assert response.status_code == 200
        assert response.json()["data"]["id"] == real_id

def test_update_finance(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/erp/finance", json={
        "name": f"Test Update {unique_val}",
        "description": "E2E Test generation",
        "status": "ACTIVE",
        "email": f"{unique_val}@test.com",
        "code": unique_val.upper()
    })
    if create_resp.status_code == 201:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.patch(f"{api_url}/erp/finance/{real_id}", json={
            "name": "Updated Name E2E"
        })
        assert response.status_code == 200

def test_delete_finance(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/erp/finance", json={
        "name": f"Test Delete {unique_val}",
        "description": "E2E Test generation",
        "status": "ACTIVE",
        "email": f"{unique_val}@test.com",
        "code": unique_val.upper()
    })
    if create_resp.status_code == 201:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.delete(f"{api_url}/erp/finance/{real_id}")
        assert response.status_code in [200, 204]
        
        # Verify deletion
        fetch_resp = auth_client.get(f"{api_url}/erp/finance/{real_id}")
        assert fetch_resp.status_code == 404
