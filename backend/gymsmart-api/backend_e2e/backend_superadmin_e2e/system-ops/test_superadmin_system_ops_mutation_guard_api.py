# RESPONSIBILITY: Black-box mutation-edge verification for the Superadmin system-ops feature.
# FLOW: pytest -> real HTTP request -> controller idempotency guard -> canonical error envelope.
# MODULE: superadmin_system_ops
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

MUTATION_ROUTES = [('POST', '/api/superadmin/system-ops/backups/trigger', 'REQ-097'), ('POST', '/api/superadmin/system-ops/backups/00000000-0000-4000-8000-000000000001/restore', 'REQ-098'), ('PATCH', '/api/superadmin/system-ops/backups/schedule', 'REQ-101'), ('POST', '/api/superadmin/system-ops/infrastructure/redis/flush-global', 'REQ-106'), ('POST', '/api/superadmin/system-ops/infrastructure/redis/flush-tenant', 'REQ-107'), ('POST', '/api/superadmin/system-ops/jobs/retry-all', 'REQ-111'), ('POST', '/api/superadmin/system-ops/jobs/00000000-0000-4000-8000-000000000001/retry', 'REQ-112'), ('POST', '/api/superadmin/system-ops/jobs/00000000-0000-4000-8000-000000000001/cancel', 'REQ-113'), ('DELETE', '/api/superadmin/system-ops/jobs/00000000-0000-4000-8000-000000000001', 'REQ-114'), ('POST', '/api/superadmin/system-ops/jobs/clear-completed', 'REQ-115'), ('POST', '/api/superadmin/system-ops/jobs/bulk-retry', 'REQ-116'), ('POST', '/api/superadmin/system-ops/jobs/bulk-delete', 'REQ-117'), ('POST', '/api/superadmin/system-ops/migrations/trigger', 'REQ-120')]


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
