from e2e.admin.conftest import ApiSession


def test_branches_read_contract(api_session: ApiSession):
    response = api_session.get('/admin/branches/fetchBranches')
    assert response.status_code == 200
    payload = response.json()
    assert payload['success'] is True
    assert 'message' in payload
    assert 'data' in payload
