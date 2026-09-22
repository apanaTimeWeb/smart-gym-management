from e2e.admin.conftest import ApiSession


def test_data_export_read_contract(api_session: ApiSession):
    response = api_session.get('/admin/data-export/fetchJobs')
    assert response.status_code == 200
    payload = response.json()
    assert payload['success'] is True
    assert 'message' in payload
    assert 'data' in payload
