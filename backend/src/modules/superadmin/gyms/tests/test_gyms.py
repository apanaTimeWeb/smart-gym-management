import pytest
import uuid

def test_create_gym(auth_client, api_url):
    unique_email = f"test_{uuid.uuid4().hex[:8]}@gym.com"
    response = auth_client.post(f"{api_url}/superadmin/gyms", json={
        "name": "Test Gym E2E",
        "email": unique_email,
        "phone": "+1234567890",
        "planId": "basic_plan",
        "ownerName": "E2E Owner",
        "ownerEmail": unique_email,
        "status": "ACTIVE"
    })
    assert response.status_code == 201, f"Failed to create gym: {response.text}"
    data = response.json()
    assert "data" in data
    assert "id" in data["data"]

def test_get_gyms(auth_client, api_url):
    response = auth_client.get(f"{api_url}/superadmin/gyms")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert isinstance(data["data"], list)

def test_get_gym_by_id(auth_client, api_url):
    unique_email = f"fetch_{uuid.uuid4().hex[:8]}@gym.com"
    create_resp = auth_client.post(f"{api_url}/superadmin/gyms", json={
        "name": "Test Gym E2E Fetch",
        "email": unique_email,
    })
    assert create_resp.status_code == 201
    gym_id = create_resp.json()["data"]["id"]
    
    response = auth_client.get(f"{api_url}/superadmin/gyms/{gym_id}")
    assert response.status_code == 200
    assert response.json()["data"]["id"] == gym_id

def test_update_gym(auth_client, api_url):
    unique_email = f"update_{uuid.uuid4().hex[:8]}@gym.com"
    create_resp = auth_client.post(f"{api_url}/superadmin/gyms", json={
        "name": "Test Gym E2E Update",
        "email": unique_email,
    })
    assert create_resp.status_code == 201
    gym_id = create_resp.json()["data"]["id"]
    
    response = auth_client.patch(f"{api_url}/superadmin/gyms/{gym_id}", json={
        "name": "Updated Gym Name"
    })
    assert response.status_code == 200
    # Refetch to ensure it updated
    fetch_resp = auth_client.get(f"{api_url}/superadmin/gyms/{gym_id}")
    assert fetch_resp.json()["data"]["name"] == "Updated Gym Name"

def test_delete_gym(auth_client, api_url):
    unique_email = f"delete_{uuid.uuid4().hex[:8]}@gym.com"
    create_resp = auth_client.post(f"{api_url}/superadmin/gyms", json={
        "name": "Test Gym E2E Delete",
        "email": unique_email,
    })
    assert create_resp.status_code == 201
    gym_id = create_resp.json()["data"]["id"]
    
    response = auth_client.delete(f"{api_url}/superadmin/gyms/{gym_id}")
    assert response.status_code == 200
    
    # Verify it is deleted
    fetch_resp = auth_client.get(f"{api_url}/superadmin/gyms/{gym_id}")
    assert fetch_resp.status_code == 404
