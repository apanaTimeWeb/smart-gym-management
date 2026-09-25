# RESPONSIBILITY: Black-box API contract verification for the Superadmin system-ops/backups module.
# FLOW: pytest -> real HTTP request -> running backend controller -> canonical response assertions.
# MODULE: superadmin_system_ops_backups
# RULE: API/E2E tests use pytest and real HTTP; no database mocking.

import os
from http import HTTPStatus
import httpx
import pytest
import uuid

BASE_URL = os.environ.get("SUPERADMIN_E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("SUPERADMIN_E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("SUPERADMIN_E2E_TENANT_ID")

ROUTES = ['/superadmin/system-ops/backups', '/api/superadmin/system-ops/backups/health']

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
def test_superadmin_system_ops_backups_read_contract(path: str) -> None:
    if not TOKEN:
        pytest.skip("SUPERADMIN_E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.get(f"{BASE_URL}{path}", headers={**_headers(), "Idempotency-Key": str(uuid.uuid4())}, timeout=10)
    _assert_envelope(response)

def test_backup_trigger_is_async_and_preserves_frontend_null_payload():
    if not TOKEN:
        pytest.skip("Runtime credentials/IDs were not supplied")
    response = httpx.post(f"{BASE_URL}/superadmin/system-ops/backups/trigger", headers={**_headers(), "Idempotency-Key": str(uuid.uuid4())}, timeout=10)
    assert response.status_code == HTTPStatus.ACCEPTED
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"] is None
    assert response.headers.get("location")
    assert response.headers.get("x-job-ids")



def test_backup_restore_is_async_and_preserves_frontend_null_payload():
    BACKUP_ID = '00000000-0000-4000-8000-000000000001'
    if not TOKEN:
        pytest.skip("Runtime credentials/IDs were not supplied")
    response = httpx.post(f"{BASE_URL}/superadmin/system-ops/backups/{BACKUP_ID}/restore", headers={**_headers(), "Idempotency-Key": str(uuid.uuid4())}, timeout=10)
    assert response.status_code == HTTPStatus.ACCEPTED
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"] is None
    assert "/superadmin/system-ops/backups/jobs/" in response.headers.get("location", "")



def test_backup_trigger_requires_idempotency_key():
    if not TOKEN:
        pytest.skip("Runtime credentials/IDs were not supplied")
    response = httpx.post(f"{BASE_URL}/superadmin/system-ops/backups/trigger", headers={"Authorization": f"Bearer {TOKEN}"}, timeout=10)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json()["data"] is None

