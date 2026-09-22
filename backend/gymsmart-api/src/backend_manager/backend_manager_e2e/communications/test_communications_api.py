# RESPONSIBILITY: Black-box API contract checks for the Manager communications feature.
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

def test_get_communications_campaigns_contract():
    response = _call('GET', 'communications/campaigns')
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

def test_get_communications_kpis_contract():
    response = _call('GET', 'communications/kpis')
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

def test_get_communications_segments_segment_param_contract():
    response = _call('GET', 'communications/segments/:segment')
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

def test_get_communications_automations_contract():
    response = _call('GET', 'communications/automations')
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

def test_get_communications_churned_members_contract():
    response = _call('GET', 'communications/churned-members')
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

def test_get_communications_churn_kpis_contract():
    response = _call('GET', 'communications/churn-kpis')
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

def test_post_communications_campaigns_contract():
    response = _call('POST', 'communications/campaigns')
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

def test_patch_communications_automations_id_param_contract():
    response = _call('PATCH', 'communications/automations/:id')
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

def test_post_communications_win_back_contract():
    response = _call('POST', 'communications/win-back')
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
