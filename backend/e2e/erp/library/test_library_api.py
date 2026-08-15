from http import HTTPStatus
def test_get_all_library(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/library/exercises?page=1&limit=20")
    assert response.status_code == HTTPStatus.OK
