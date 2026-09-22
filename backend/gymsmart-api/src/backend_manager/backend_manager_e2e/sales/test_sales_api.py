# RESPONSIBILITY: Black-box API contract checks for the Manager sales feature.
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

def test_get_sales_overview_contract():
    response = _call('GET', 'sales/overview')
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

def test_get_sales_membership_report_contract():
    response = _call('GET', 'sales/membership-report')
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

def test_get_sales_pending_payments_contract():
    response = _call('GET', 'sales/pending-payments')
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

def test_get_sales_all_memberships_contract():
    response = _call('GET', 'sales/all-memberships')
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
