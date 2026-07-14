def test_get_dashboard(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/dashboard/overview")
    assert response.status_code == 200
