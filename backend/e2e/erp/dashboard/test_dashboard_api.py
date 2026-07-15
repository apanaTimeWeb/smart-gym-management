from http import HTTPStatus
def test_get_dashboard(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/dashboard/kpi")
    assert response.status_code == HTTPStatus.OK
