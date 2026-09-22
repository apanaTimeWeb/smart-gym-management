# RESPONSIBILITY: Provisions and tears down a fresh tenant through the test-only API boundary for every E2E session.
# FLOW: Pytest session → live probe → POST /test/tenants → isolated tenant requests → DELETE /test/tenants/{id}.
import os
import uuid
from typing import Any

import pytest
import requests

BASE_URL = os.getenv("E2E_BASE_URL", "http://localhost:3000")
BOOTSTRAP_TOKEN = os.getenv("E2E_BOOTSTRAP_TOKEN", "")


@pytest.fixture(autouse=True, scope="session")
def require_live_api() -> None:
    response = requests.get(f"{BASE_URL}/api/v1/health/live", timeout=5)
    if response.status_code != 200:
        pytest.fail("Live API is required for black-box E2E tests.")


@pytest.fixture(scope="session")
def isolated_tenant() -> str:
    if not BOOTSTRAP_TOKEN:
        pytest.fail("E2E_BOOTSTRAP_TOKEN must be set for isolated tenant provisioning.")
    response = requests.post(
        f"{BASE_URL}/api/v1/test/tenants",
        headers={"x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        timeout=30,
    )
    if response.status_code != 201:
        pytest.fail(f"Fresh E2E tenant provisioning failed: HTTP {response.status_code} {response.text}")
    tenant_id = response.json()["data"]["tenantId"]
    try:
        yield tenant_id
    finally:
        cleanup = requests.delete(
            f"{BASE_URL}/api/v1/test/tenants/{tenant_id}",
            headers={"x-test-bootstrap-token": BOOTSTRAP_TOKEN},
            timeout=30,
        )
        if cleanup.status_code != 200:
            pytest.fail(f"E2E tenant cleanup failed: HTTP {cleanup.status_code} {cleanup.text}")


@pytest.fixture(scope="session")
def api(isolated_tenant: str) -> dict[str, Any]:
    return {"base_url": BASE_URL, "tenant_id": isolated_tenant}


@pytest.fixture
def unique_email() -> str:
    return f"e2e-{uuid.uuid4()}@example.org"
