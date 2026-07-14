import pytest
import uuid

def test_create_infrastructure(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    response = auth_client.post(f"{api_url}/superadmin/infrastructure", json={
        "name": f"Test Infra {unique_val}",
        "type": "VPS",
        "status": "RUNNING"
    })
    assert response.status_code == 201, f"Unexpected status: {response.status_code} - {response.text}"
    
    if response.status_code == 201:
        data = response.json()
        assert "data" in data

def test_get_infrastructure(auth_client, api_url):
    response = auth_client.get(f"{api_url}/superadmin/infrastructure")
    assert response.status_code == 200
    
    if response.status_code == 200:
        data = response.json()
        assert "data" in data
        assert isinstance(data["data"], dict)

def test_get_infrastructure_by_id(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/infrastructure", json={
        "name": f"Test Infra {unique_val}",
        "type": "VPS",
        "status": "RUNNING"
    })
    real_id = create_resp.json()["data"]["id"]
    response = auth_client.get(f"{api_url}/superadmin/infrastructure/{real_id}")
    assert response.status_code == 200

def test_update_infrastructure(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/infrastructure", json={
        "name": f"Test Infra {unique_val}",
        "type": "VPS",
        "status": "RUNNING"
    })
    real_id = create_resp.json()["data"]["id"]
    response = auth_client.patch(f"{api_url}/superadmin/infrastructure/{real_id}", json={
        "status": "STOPPED"
    })
    assert response.status_code == 200

def test_delete_infrastructure(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/infrastructure", json={
        "name": f"Test Infra {unique_val}",
        "type": "VPS",
        "status": "RUNNING"
    })
    real_id = create_resp.json()["data"]["id"]
    response = auth_client.delete(f"{api_url}/superadmin/infrastructure/{real_id}")
    assert response.status_code in [200, 204]
