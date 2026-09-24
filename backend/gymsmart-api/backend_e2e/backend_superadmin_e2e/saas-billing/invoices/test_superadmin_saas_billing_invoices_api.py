# RESPONSIBILITY: Black-box API contract verification for the Superadmin saas-billing/invoices module.
# FLOW: pytest -> real HTTP request -> running backend controller -> canonical response assertions.
# MODULE: superadmin_saas_billing_invoices
# RULE: API/E2E tests use pytest and real HTTP; no database mocking.

import os
import uuid
from http import HTTPStatus
import httpx
import pytest

BASE_URL = os.environ.get("SUPERADMIN_E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("SUPERADMIN_E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("SUPERADMIN_E2E_TENANT_ID")
INVOICE_ID = os.environ.get("SUPERADMIN_E2E_INVOICE_ID")

ROUTES = ['/superadmin/saas-billing/invoices', '/api/superadmin/saas-billing/invoices/recovery-center']

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
def test_superadmin_saas_billing_invoices_read_contract(path: str) -> None:
    if not TOKEN:
        pytest.skip("SUPERADMIN_E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.get(f"{BASE_URL}{path}", headers=_headers(), timeout=10)
    _assert_envelope(response)

def test_invoice_resend_preserves_frozen_null_payload_and_exposes_job_location():
    if not TOKEN or not INVOICE_ID:
        pytest.skip("Runtime credentials/IDs were not supplied")
    response = httpx.post(
        f"{BASE_URL}/superadmin/saas-billing/invoices/{INVOICE_ID}/resend",
        headers={"Authorization": f"Bearer {TOKEN}", "Idempotency-Key": str(uuid.uuid4())},
        timeout=10,
    )
    assert response.status_code == HTTPStatus.ACCEPTED
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"] is None
    location = response.headers.get("location")
    assert location and "/resend-jobs/" in location



def test_invoice_resend_requires_idempotency_key():
    if not TOKEN or not INVOICE_ID:
        pytest.skip("Runtime credentials/IDs were not supplied")
    response = httpx.post(
        f"{BASE_URL}/superadmin/saas-billing/invoices/{INVOICE_ID}/resend",
        headers={"Authorization": f"Bearer {TOKEN}"},
        timeout=10,
    )
    assert response.status_code == HTTPStatus.BAD_REQUEST
    payload = response.json()
    assert payload["data"] is None
    assert payload["errorCode"]

