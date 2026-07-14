def test_get_settings(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/settings")
    assert response.status_code == 200
