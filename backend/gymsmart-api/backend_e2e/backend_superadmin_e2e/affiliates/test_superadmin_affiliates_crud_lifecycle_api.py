# RESPONSIBILITY: Proves the real HTTP CRUD lifecycle for the Superadmin affiliates feature.
# FLOW: create -> GET real id -> PATCH -> DELETE/soft-delete -> GET verifies not found.
# MODULE: superadmin_affiliates
# RULE: Requires a dedicated E2E test database and explicit mutation opt-in.

import os
import uuid
from http import HTTPStatus
import httpx
import pytest

BASE_URL = os.environ.get("SUPERADMIN_E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("SUPERADMIN_E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("SUPERADMIN_E2E_TENANT_ID")

def _headers(idempotency: str | None = None) -> dict[str, str]:
    headers = {"Authorization": f"Bearer {TOKEN}"}
    if TENANT_ID: headers["x-tenant-id"] = TENANT_ID
    if idempotency: headers["Idempotency-Key"] = idempotency
    return headers

@pytest.mark.e2e_mutation
def test_superadmin_affiliate_crud_lifecycle() -> None:
    if not TOKEN or os.environ.get("SUPERADMIN_E2E_MUTATION_ENABLED") != "1":
        pytest.skip("Live mutation E2E requires SUPERADMIN_E2E_ACCESS_TOKEN and SUPERADMIN_E2E_MUTATION_ENABLED=1")
    suffix = uuid.uuid4().hex[:10]
    payload = {"name": f"E2E Affiliate {suffix}", "email": f"affiliate-{suffix}@example.invalid", "referralCode": f"E2E{suffix}"}
    client = httpx.Client(base_url=BASE_URL, timeout=15.0, headers=_headers())
    create = client.post("/superadmin/affiliates", json=payload, headers=_headers(str(uuid.uuid4())))
    assert create.status_code == HTTPStatus.CREATED, create.text
    data = create.json(); assert data["success"] is True; affiliate_id = data["data"]["id"]
    try:
        found = client.get(f"/superadmin/affiliates/{affiliate_id}")
        assert found.status_code == HTTPStatus.OK, found.text
        assert found.json()["data"]["id"] == affiliate_id
        patch = client.patch(f"/superadmin/affiliates/{affiliate_id}", json={"name": f"E2E Affiliate Updated {suffix}"}, headers=_headers(str(uuid.uuid4())))
        assert patch.status_code == HTTPStatus.OK, patch.text
        assert patch.json()["data"]["name"] == f"E2E Affiliate Updated {suffix}"
        delete = client.delete(f"/superadmin/affiliates/{affiliate_id}", headers=_headers(str(uuid.uuid4())))
        assert delete.status_code in (HTTPStatus.OK, HTTPStatus.NO_CONTENT), delete.text
        gone = client.get(f"/superadmin/affiliates/{affiliate_id}")
        assert gone.status_code == HTTPStatus.NOT_FOUND, gone.text
        assert gone.json()["data"] is None
    finally:
        client.close()
