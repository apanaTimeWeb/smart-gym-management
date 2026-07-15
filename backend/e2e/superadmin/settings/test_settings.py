from http import HTTPStatus
import pytest
import uuid

def test_create_setting(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    response = auth_client.post(f"{api_url}/superadmin/settings", json={
        "key": f"TEST_KEY_{unique_val}",
        "value": "true",
        "group": "GENERAL"
    })
    assert response.status_code == HTTPStatus.CREATED, f"Unexpected status: {response.status_code} - {response.text}"
    
    if response.status_code == HTTPStatus.CREATED:
        data = response.json()
        assert "data" in data
        assert "id" in data["data"]

def test_get_settings(auth_client, api_url):
    response = auth_client.get(f"{api_url}/superadmin/settings")
    assert response.status_code == HTTPStatus.OK
    
    if response.status_code == HTTPStatus.OK:
        data = response.json()
        assert "data" in data
        assert isinstance(data["data"], list)

def test_get_setting_by_id(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/settings", json={
        "key": f"TEST_KEY_{unique_val}",
        "value": "true",
        "group": "GENERAL"
    })
    if create_resp.status_code == HTTPStatus.CREATED:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.get(f"{api_url}/superadmin/settings/{real_id}")
        assert response.status_code == HTTPStatus.OK
        assert response.json()["data"]["id"] == real_id

def test_update_setting(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/settings", json={
        "key": f"TEST_KEY_{unique_val}",
        "value": "true",
        "group": "GENERAL"
    })
    if create_resp.status_code == HTTPStatus.CREATED:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.patch(f"{api_url}/superadmin/settings/{real_id}", json={
            "value": "false"
        })
        assert response.status_code == HTTPStatus.OK

def test_delete_setting(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/superadmin/settings", json={
        "key": f"TEST_KEY_{unique_val}",
        "value": "true",
        "group": "GENERAL"
    })
    if create_resp.status_code == HTTPStatus.CREATED:
        real_id = create_resp.json()["data"]["id"]
        response = auth_client.delete(f"{api_url}/superadmin/settings/{real_id}")
        assert response.status_code in [200, 204]
        
        # Verify deletion
        fetch_resp = auth_client.get(f"{api_url}/superadmin/settings/{real_id}")
        assert fetch_resp.status_code == HTTPStatus.NOT_FOUND
