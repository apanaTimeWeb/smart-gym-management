# RESPONSIBILITY: Black-box API contract verification for the Superadmin messaging module.
# FLOW: pytest -> real HTTP request -> running backend controller -> canonical response assertions.
# MODULE: superadmin_messaging
# RULE: API/E2E tests use pytest and real HTTP; no database mocking.

import os
from http import HTTPStatus
import httpx
import pytest

BASE_URL = os.environ.get("SUPERADMIN_E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("SUPERADMIN_E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("SUPERADMIN_E2E_TENANT_ID")

ROUTES = ['/superadmin/messaging/messages', '/superadmin/messaging/notifications', '/superadmin/messaging/tenants', '/api/superadmin/messaging/template-insights']

def _headers() -> dict[str, str]:
    if not TOKEN:
        return {}
    headers = {"Authorization": f"Bearer {TOKEN}"}
    if TENANT_ID:
        headers["x-tenant-id"] = TENANT_ID
    return headers

def _assert_envelope(response: httpx.Response) -> None:
    assert response.status_code == HTTPStatus.OK, response.text
    payload = response.json()
    assert payload.get("success") is True, payload
    assert isinstance(payload.get("message"), str) and payload["message"].strip()
    assert "data" in payload
    assert payload.get("data") is not None
    if "meta" in payload:
        meta = payload["meta"]
        for key in ("total", "page", "limit", "totalPages", "hasNextPage", "hasPrevPage"):
            assert key in meta, meta

@pytest.mark.parametrize("path", ROUTES)
def test_superadmin_messaging_read_contract(path: str) -> None:
    if not TOKEN:
        pytest.skip("SUPERADMIN_E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.get(f"{BASE_URL}{path}", headers=_headers(), timeout=10)
    _assert_envelope(response)
