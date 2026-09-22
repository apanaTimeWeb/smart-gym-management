# RESPONSIBILITY: Black-box API contract checks for the Manager hr feature.
# FLOW: Pytest -> live HTTP API -> canonical envelope/HTTP contract.
import os
import uuid
import requests
from http import HTTPStatus

BASE_URL=os.environ.get('MANAGER_E2E_BASE_URL','').rstrip('/')
TENANT=os.environ.get('MANAGER_E2E_TENANT_ID','')
TOKEN=os.environ.get('MANAGER_E2E_TOKEN','')

def _headers(extra=None):
    headers={'x-tenant-id':TENANT,'Authorization':f'Bearer {TOKEN}','Accept':'application/json'}
    if extra: headers.update(extra)
    return headers

def _require_runtime():
    if not BASE_URL or not TENANT or not TOKEN:
        raise AssertionError('Runtime E2E requires MANAGER_E2E_BASE_URL, MANAGER_E2E_TENANT_ID and MANAGER_E2E_TOKEN')

def _call(method,path,**kwargs):
    _require_runtime()
    return requests.request(method, f'{BASE_URL}/api/v1/manager/{path}', headers=_headers(kwargs.pop('headers',None)), timeout=5, **kwargs)

def test_get_hr_staff_contract():
    response = _call('GET', 'hr/staff')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_get_hr_staff_id_param_contract():
    response = _call('GET', 'hr/staff/:id')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_get_hr_payrolls_contract():
    response = _call('GET', 'hr/payrolls')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_get_hr_summary_contract():
    response = _call('GET', 'hr/summary')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_get_hr_ledger_staffId_param_contract():
    response = _call('GET', 'hr/ledger/:staffId')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_get_hr_staff_staffId_attendance_param_contract():
    response = _call('GET', 'hr/staff/:staffId/attendance')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_post_hr_staff_contract():
    response = _call('POST', 'hr/staff')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_patch_hr_staff_id_param_contract():
    response = _call('PATCH', 'hr/staff/:id')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_delete_hr_staff_id_param_contract():
    response = _call('DELETE', 'hr/staff/:id')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_post_hr_payrolls_generate_contract():
    response = _call('POST', 'hr/payrolls/generate')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_post_hr_payrolls_contract():
    response = _call('POST', 'hr/payrolls')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_patch_hr_payrolls_id_param_contract():
    response = _call('PATCH', 'hr/payrolls/:id')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_patch_hr_payrolls_id_status_param_contract():
    response = _call('PATCH', 'hr/payrolls/:id/status')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_post_hr_ledger_advance_contract():
    response = _call('POST', 'hr/ledger/advance')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body

def test_post_hr_ledger_paydue_contract():
    response = _call('POST', 'hr/ledger/paydue')
    assert response.status_code not in {HTTPStatus.NOT_FOUND}
    if response.headers.get('content-type','').startswith('application/json'):
        body=response.json()
        assert isinstance(body, dict)
        assert 'success' in body
        assert 'message' in body
        assert 'data' in body
        if response.status_code >= 400:
            assert body['data'] is None
            assert 'errorCode' in body
