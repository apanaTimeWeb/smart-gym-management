import pytest
import uuid

def test_create_backup(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    response = auth_client.post(f"{api_url}/superadmin/backups", json={
        "tenantName": f"Test Tenant {unique_val}",
        "databaseName": f"db_{unique_val}",
        "sizeMB": 1024,
        "status": "SUCCESS"
    })
    assert response.status_code == 201, f"Unexpected status: {response.status_code} - {response.text}"
    
    if response.status_code == 201:
        data = response.json()
        assert "data" in data
        assert "id" in data["data"]

def test_get_backups(auth_client, api_url):
    response = auth_client.get(f"{api_url}/superadmin/backups")
    assert response.status_code == 200
    
    if response.status_code == 200:
        data = response.json()
        assert "data" in data
        assert isinstance(data["data"], list)

def test_get_backup_by_id(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/backups", json={
        "tenantName": f"Test Tenant {unique_val}",
        "databaseName": f"db_{unique_val}",
        "sizeMB": 1024,
        "status": "SUCCESS"
    })
    if create_resp.status_code == 201:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.get(f"{api_url}/superadmin/backups/{real_id}")
        assert response.status_code == 200
        assert response.json()["data"]["id"] == real_id

def test_update_backup(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/backups", json={
        "tenantName": f"Test Tenant {unique_val}",
        "databaseName": f"db_{unique_val}",
        "sizeMB": 1024,
        "status": "SUCCESS"
    })
    if create_resp.status_code == 201:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.patch(f"{api_url}/superadmin/backups/{real_id}", json={
            "status": "SUCCESS"
        })
        assert response.status_code == 200

def test_delete_backup(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/backups", json={
        "tenantName": f"Test Tenant {unique_val}",
        "databaseName": f"db_{unique_val}",
        "sizeMB": 1024,
        "status": "SUCCESS"
    })
    if create_resp.status_code == 201:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.delete(f"{api_url}/superadmin/backups/{real_id}")
        assert response.status_code in [200, 204]
        
        # Verify deletion
        fetch_resp = auth_client.get(f"{api_url}/superadmin/backups/{real_id}")
        assert fetch_resp.status_code == 404
