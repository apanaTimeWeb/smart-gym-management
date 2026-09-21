# RESPONSIBILITY: Provides isolated black-box E2E fixtures and live API precondition checks.
# FLOW: Pytest session → live health probe → per-test request fixtures.
import os
import uuid
from typing import Any

import pytest
import requests

BASE_URL = os.getenv("E2E_BASE_URL", "http://localhost:3000")
TENANT_ID = os.getenv("E2E_TENANT_ID", os.getenv("PUBLIC_TENANT_ID", "00000000-0000-0000-0000-000000000001"))


@pytest.fixture(scope="session")
def api() -> dict[str, Any]:
    return {"base_url": BASE_URL, "tenant_id": TENANT_ID}


@pytest.fixture
def unique_email() -> str:
    return f"e2e-{uuid.uuid4()}@example.org"


@pytest.fixture(autouse=True, scope="session")
def require_live_api() -> None:
    response = requests.get(f"{BASE_URL}/api/v1/health/live", timeout=5)
    if response.status_code != 200:
        pytest.fail("Live API is required for black-box E2E tests.")
