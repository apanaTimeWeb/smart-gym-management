# RESPONSIBILITY: Black-box API contract verification for the Admin payouts module.
# FLOW: pytest -> real HTTP request -> running backend controller -> canonical response assertions.
# MODULE: admin_payouts
# RULE: API/E2E tests use pytest and real HTTP; no database mocking.

import os
from http import HTTPStatus
import httpx
import pytest

BASE_URL = os.environ.get("E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("E2E_TENANT_ID")

ROUTES = ['/admin/payouts/fetchPayouts', '/admin/payouts/fetchPnL', '/admin/payouts/fetchKPIs']
MUTATION_ROUTES = []

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
def test_admin_payouts_read_contract(path: str) -> None:
    if not TOKEN:
        pytest.skip("E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.get(f"{BASE_URL}{path}", headers=_headers(), timeout=10)
    _assert_envelope(response)


