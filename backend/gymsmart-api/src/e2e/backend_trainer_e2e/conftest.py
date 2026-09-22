# RESPONSIBILITY: Provides the authenticated HTTP client context for Trainer black-box API tests.
# FLOW: Pytest fixture → environment credentials → HTTP headers → feature E2E test.

from __future__ import annotations

import os
import uuid

import pytest


@pytest.fixture
def trainer_http_context() -> tuple[str, dict[str, str]]:
    base_url = os.getenv("E2E_BASE_URL")
    token = os.getenv("E2E_ACCESS_TOKEN")
    tenant_id = os.getenv("E2E_TENANT_ID")
    missing = [name for name, value in (("E2E_BASE_URL", base_url), ("E2E_ACCESS_TOKEN", token), ("E2E_TENANT_ID", tenant_id)) if not value]
    if missing:
        pytest.fail("E2E runtime environment not supplied: " + ",".join(missing) + ". Refusing to skip live contract tests.")
    return base_url.rstrip("/"), {
        "Authorization": f"Bearer {token}",
        "x-tenant-id": tenant_id,
        "x-request-id": str(uuid.uuid4()),
    }
