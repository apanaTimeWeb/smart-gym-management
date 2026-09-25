# RESPONSIBILITY: Black-box verification of the asynchronous Superadmin tenant export API.
# FLOW: pytest -> POST export -> canonical 202 response -> job identifier and status contract.
# MODULE: superadmin_export_data
# RULE: Rule 119 + Rule 101 — real HTTP only; no database mocks.

import os
from http import HTTPStatus
import uuid
import httpx
import pytest

BASE_URL = os.environ.get("SUPERADMIN_E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("SUPERADMIN_E2E_ACCESS_TOKEN")

def test_export_requires_idempotency_key() -> None:
    if not TOKEN:
        pytest.skip("SUPERADMIN_E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.post(f"{BASE_URL}/superadmin/export-data", headers={"Authorization": f"Bearer {TOKEN}"}, json={}, timeout=10)
    assert response.status_code == HTTPStatus.BAD_REQUEST, response.text
    payload = response.json()
    assert payload["success"] is False
    assert payload["data"] is None

def test_export_starts_asynchronously() -> None:
    if not TOKEN:
        pytest.skip("SUPERADMIN_E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.post(f"{BASE_URL}/superadmin/export-data", headers={"Authorization": f"Bearer {TOKEN}", "Idempotency-Key": str(uuid.uuid4())}, json={}, timeout=10)
    assert response.status_code == HTTPStatus.ACCEPTED, response.text
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"] is not None
