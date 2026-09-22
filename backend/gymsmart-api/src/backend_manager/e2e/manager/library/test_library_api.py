# RESPONSIBILITY: Black-box API contract checks for the Manager library feature.
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

def test_get_library_exercises_contract():
    response = _call('GET', 'library/exercises')
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

def test_get_library_diet_plans_contract():
    response = _call('GET', 'library/diet-plans')
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

def test_post_library_exercises_contract():
    response = _call('POST', 'library/exercises')
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

def test_patch_library_exercises_id_param_contract():
    response = _call('PATCH', 'library/exercises/:id')
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

def test_delete_library_exercises_id_param_contract():
    response = _call('DELETE', 'library/exercises/:id')
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

def test_post_library_diet_plans_contract():
    response = _call('POST', 'library/diet-plans')
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

def test_patch_library_diet_plans_id_param_contract():
    response = _call('PATCH', 'library/diet-plans/:id')
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

def test_delete_library_diet_plans_id_param_contract():
    response = _call('DELETE', 'library/diet-plans/:id')
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
