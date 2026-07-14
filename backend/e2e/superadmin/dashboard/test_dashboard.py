from http import HTTPStatus
import pytest
import uuid

def test_create_dashboard(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    response = auth_client.post(f"{api_url}/superadmin/dashboard", json={
        "name": f"Test Dashboard {unique_val}"
    })
    assert response.status_code == HTTPStatus.CREATED, f"Unexpected status: {response.status_code} - {response.text}"
    
    if response.status_code == HTTPStatus.CREATED:
        data = response.json()
        assert "data" in data

def test_get_dashboard(auth_client, api_url):
    response = auth_client.get(f"{api_url}/superadmin/dashboard")
    assert response.status_code == HTTPStatus.OK
    
    if response.status_code == HTTPStatus.OK:
        data = response.json()
        assert isinstance(data["data"], dict)

def x_test_get_dashboard_by_id(auth_client, api_url):
    response = auth_client.get(f"{api_url}/superadmin/dashboard/dummy-id")
    assert response.status_code == HTTPStatus.OK

def x_test_update_dashboard(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/superadmin/dashboard/dummy-id", json={
        "title": "Updated Dashboard"
    })
    assert response.status_code == HTTPStatus.OK

def x_test_delete_dashboard(auth_client, api_url):
    response = auth_client.delete(f"{api_url}/superadmin/dashboard/dummy-id")
    assert response.status_code in [200, 204]
