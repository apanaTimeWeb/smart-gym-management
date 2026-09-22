from e2e.admin.conftest import ApiSession


def test_notifications_read_contract(api_session: ApiSession):
    response = api_session.get('/admin/notifications')
    assert response.status_code == 200
    payload = response.json()
    assert payload['success'] is True
    assert 'message' in payload
    assert 'data' in payload
