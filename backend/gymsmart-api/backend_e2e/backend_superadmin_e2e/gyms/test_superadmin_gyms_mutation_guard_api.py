# RESPONSIBILITY: Black-box mutation-edge verification for the Superadmin gyms feature.
# FLOW: pytest -> real HTTP request -> controller idempotency guard -> canonical error envelope.
# MODULE: superadmin_gyms
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

MUTATION_ROUTES = [('POST', '/superadmin/gyms', 'REQ-040'), ('PATCH', '/superadmin/gyms/00000000-0000-4000-8000-000000000001', 'REQ-041'), ('PATCH', '/superadmin/gyms/00000000-0000-4000-8000-000000000001/status', 'REQ-042'), ('POST', '/superadmin/gyms/00000000-0000-4000-8000-000000000001/impersonate', 'REQ-043'), ('DELETE', '/superadmin/gyms/00000000-0000-4000-8000-000000000001', 'REQ-044'), ('POST', '/superadmin/gyms/00000000-0000-4000-8000-000000000001/email', 'REQ-046'), ('POST', '/superadmin/gyms/provision', 'REQ-048'), ('POST', '/superadmin/auth/exit-ghost-login', 'REQ-049'), ('POST', '/superadmin/auth/set-cookie', 'REQ-050'), ('POST', '/superadmin/gyms/business-controls', 'REQ-052')]


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
