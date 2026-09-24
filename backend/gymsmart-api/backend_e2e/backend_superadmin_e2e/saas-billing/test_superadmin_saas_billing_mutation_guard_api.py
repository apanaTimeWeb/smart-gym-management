# RESPONSIBILITY: Black-box mutation-edge verification for the Superadmin saas-billing feature.
# FLOW: pytest -> real HTTP request -> controller idempotency guard -> canonical error envelope.
# MODULE: superadmin_saas_billing
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

MUTATION_ROUTES = [('POST', '/superadmin/saas-billing/coupons', 'REQ-073'), ('PATCH', '/superadmin/saas-billing/coupons/00000000-0000-4000-8000-000000000001', 'REQ-074'), ('DELETE', '/superadmin/saas-billing/coupons/00000000-0000-4000-8000-000000000001', 'REQ-075'), ('POST', '/superadmin/saas-billing/coupons/00000000-0000-4000-8000-000000000001/restore', 'REQ-076'), ('PATCH', '/superadmin/saas-billing/coupons/00000000-0000-4000-8000-000000000001/status', 'REQ-077'), ('POST', '/superadmin/saas-billing/invoices/manual-payment', 'REQ-080'), ('POST', '/superadmin/saas-billing/invoices/00000000-0000-4000-8000-000000000001/resend', 'REQ-083'), ('POST', '/superadmin/saas-billing/plans', 'REQ-088'), ('PATCH', '/superadmin/saas-billing/plans/00000000-0000-4000-8000-000000000001', 'REQ-089'), ('DELETE', '/superadmin/saas-billing/plans/00000000-0000-4000-8000-000000000001', 'REQ-090'), ('PATCH', '/superadmin/saas-billing/plans/00000000-0000-4000-8000-000000000001/archive', 'REQ-091')]


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
