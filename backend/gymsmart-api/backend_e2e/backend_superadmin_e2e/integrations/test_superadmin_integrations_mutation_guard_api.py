# RESPONSIBILITY: Black-box mutation-edge verification for the Superadmin integrations feature.
# FLOW: pytest -> real HTTP request -> controller idempotency guard -> canonical error envelope.
# MODULE: superadmin_integrations
# RULE: Uses real HTTP only; no database mocking and no shared helpers.

import os
from http import HTTPStatus
import httpx
import pytest

BASE_URL = os.environ.get("SUPERADMIN_E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("SUPERADMIN_E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("SUPERADMIN_E2E_TENANT_ID")


def _headers() -> dict[str, str]:
    headers = {"Authorization": f"Bearer {TOKEN}"} if TOKEN else {}
    if TENANT_ID: headers["x-tenant-id"] = TENANT_ID
    return headers

MUTATION_ROUTES = [('POST', 'SuperadminIntegrationsUrlConfig.BACKEND_API.GENERATE_API_KEY', 'REQ-054')]


@pytest.mark.parametrize("method,path,requirement", MUTATION_ROUTES)
def test_superadmin_mutation_requires_idempotency_key(method: str, path: str, requirement: str) -> None:
    """Proves the live HTTP mutation edge rejects missing Idempotency-Key."""
    if not TOKEN:
        pytest.skip("SUPERADMIN_E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.request(method, f"{BASE_URL}{path}", headers=_headers(), timeout=10)
    assert response.status_code == HTTPStatus.BAD_REQUEST, (requirement, response.text)
    payload = response.json()
    assert payload.get("success") is False, payload
    assert payload.get("data") is None, payload
    assert payload.get("errorCode"), payload
