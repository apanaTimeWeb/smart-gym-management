# RESPONSIBILITY: Black-box API contract verification for the Admin announcements module.
# FLOW: pytest -> real HTTP request -> running backend controller -> canonical response assertions.
# MODULE: admin_announcements
# RULE: API/E2E tests use pytest and real HTTP; no database mocking.

import os
from http import HTTPStatus
import httpx
import pytest

BASE_URL = os.environ.get("E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("E2E_TENANT_ID")

ROUTES = ['/admin/announcements/fetchAnnouncements', '/admin/announcements/fetchKPIs']
MUTATION_ROUTES = [('POST', '/admin/announcements'), ('POST', '/admin/announcements/createAnnouncement'), ('POST', '/admin/announcements/updateAnnouncement'), ('PATCH', '/admin/announcements/00000000-0000-4000-8000-000000000001'), ('DELETE', '/admin/announcements/deleteAnnouncement'), ('DELETE', '/admin/announcements/00000000-0000-4000-8000-000000000001'), ('POST', '/admin/announcements/togglePin'), ('PATCH', '/admin/announcements/00000000-0000-4000-8000-000000000001/pin')]

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

@pytest.mark.parametrize("path", ROUTES)
def test_admin_announcements_read_contract(path: str) -> None:
    if not TOKEN:
        pytest.skip("E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.get(f"{BASE_URL}{path}", headers=_headers(), timeout=10)
    _assert_envelope(response)

@pytest.mark.parametrize("method,path", MUTATION_ROUTES)
def test_admin_announcements_mutation_requires_idempotency_key(method: str, path: str) -> None:
    if not TOKEN:
        pytest.skip("E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.request(method, f"{BASE_URL}{path.replace('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001')}", headers=_headers(), timeout=10)
    assert response.status_code == HTTPStatus.BAD_REQUEST, response.text
    payload = response.json()
    assert payload.get("success") is False, payload
    assert payload.get("data") is None, payload
    assert payload.get("errorCode"), payload
