from http import HTTPStatus
import pytest
import uuid

def test_create_migration(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    response = auth_client.post(f"{api_url}/superadmin/migrations", json={
        "name": f"Test Migration {unique_val}",
        "appliedAt": "2026-01-01T00:00:00Z"
    })
    assert response.status_code == HTTPStatus.CREATED, f"Unexpected status: {response.status_code} - {response.text}"
    
    if response.status_code == HTTPStatus.CREATED:
        data = response.json()
        assert "data" in data
        assert "id" in data["data"]

def test_get_migrations(auth_client, api_url):
    response = auth_client.get(f"{api_url}/superadmin/migrations")
    assert response.status_code == HTTPStatus.OK
    
    if response.status_code == HTTPStatus.OK:
        data = response.json()
        assert "data" in data
        assert isinstance(data["data"], list)

def test_get_migration_by_id(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/migrations", json={
        "name": f"Test Migration {unique_val}",
        "appliedAt": "2026-01-01T00:00:00Z"
    })
    if create_resp.status_code == HTTPStatus.CREATED:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.get(f"{api_url}/superadmin/migrations/{real_id}")
        assert response.status_code == HTTPStatus.OK
        assert response.json()["data"]["id"] == real_id

def test_update_migration(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/migrations", json={
        "name": f"Test Migration {unique_val}",
        "appliedAt": "2026-01-01T00:00:00Z"
    })
    if create_resp.status_code == HTTPStatus.CREATED:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.patch(f"{api_url}/superadmin/migrations/{real_id}", json={
            "name": f"Updated Migration {uuid.uuid4().hex[:8]}"
        })
        assert response.status_code == HTTPStatus.OK

def test_delete_migration(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/migrations", json={
        "name": f"Test Migration {unique_val}",
        "appliedAt": "2026-01-01T00:00:00Z"
    })
    if create_resp.status_code == HTTPStatus.CREATED:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.delete(f"{api_url}/superadmin/migrations/{real_id}")
        assert response.status_code in [200, 204]
        
        # Verify deletion
        fetch_resp = auth_client.get(f"{api_url}/superadmin/migrations/{real_id}")
        assert fetch_resp.status_code == HTTPStatus.NOT_FOUND
