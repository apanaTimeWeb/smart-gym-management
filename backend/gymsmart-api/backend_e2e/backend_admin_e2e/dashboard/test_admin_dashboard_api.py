# RESPONSIBILITY: Black-box API contract smoke tests for Admin dashboard.
# FLOW: External pytest client -> real Admin API -> canonical response/error envelope.
# MODULE: backend_admin_e2e/admin_dashboard
# RULE: Rule 27 / Rule 43 — Pytest black-box E2E isolation and real backend verification.

import os
import uuid
from http import HTTPStatus

import pytest
import requests

BASE_URL = os.environ.get("E2E_BASE_URL")
ACCESS_TOKEN = os.environ.get("E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("E2E_TENANT_ID")
RESOURCE_ID = os.environ.get("E2E_RESOURCE_ID")


def require_runtime_config():
    missing = [name for name, value in (("E2E_BASE_URL", BASE_URL), ("E2E_ACCESS_TOKEN", ACCESS_TOKEN), ("E2E_TENANT_ID", TENANT_ID)) if not value]
    if missing:
        pytest.fail("Missing E2E runtime configuration: " + ", ".join(missing))


def request_headers(idempotency_key=None):
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}", "x-tenant-id": TENANT_ID, "Accept": "application/json"}
    if idempotency_key:
        headers["Idempotency-Key"] = idempotency_key
    return headers


def resolve_path(raw_path):
    path = raw_path.replace("{{id}}", RESOURCE_ID or "")
    if "{{id}}" in raw_path and not RESOURCE_ID:
        pytest.fail("E2E_RESOURCE_ID is required for a resource-scoped endpoint")
    return path


def assert_envelope(response):
    assert response.status_code != HTTPStatus.INTERNAL_SERVER_ERROR
    body = response.json()
    assert isinstance(body, dict)
    assert "success" in body and "message" in body and "data" in body
    assert body["success"] is (response.status_code < HTTPStatus.BAD_REQUEST)
    if response.status_code >= HTTPStatus.BAD_REQUEST:
        assert body["data"] is None
        assert body.get("errorCode")


@pytest.mark.parametrize("name,method,path", [
    ('Execute fetchDashboardStats', 'GET', '/api/v1/admin/dashboard/fetchDashboardStats'),
], ids=lambda item: item[0])
def test_dashboard_endpoint_contract(name, method, path):
    """Each discovered collection operation reaches the real backend and satisfies the canonical envelope contract."""
    require_runtime_config()
    resolved = resolve_path(path)
    idempotency_key = str(uuid.uuid4()) if method in {"POST", "PATCH", "PUT", "DELETE"} else None
    json_body = {} if method in {"POST", "PATCH", "PUT", "DELETE"} else None
    response = requests.request(method, BASE_URL.rstrip("/") + resolved, headers=request_headers(idempotency_key), json=json_body, timeout=30, allow_redirects=False)
    assert_envelope(response)
    if method in {"POST", "PATCH", "PUT", "DELETE"}:
        replay = requests.request(method, BASE_URL.rstrip("/") + resolved, headers=request_headers(idempotency_key), json=json_body, timeout=30, allow_redirects=False)
        assert replay.status_code == response.status_code
        assert replay.json() == response.json()
