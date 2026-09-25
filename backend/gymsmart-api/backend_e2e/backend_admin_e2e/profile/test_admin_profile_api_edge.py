# RESPONSIBILITY: Negative black-box API contract test for Admin profile.
# FLOW: Unauthenticated client -> protected endpoint -> canonical 401 error envelope.
# MODULE: admin_profile
# RULE: Rule 27 — Pytest black-box E2E isolation.

import os
from http import HTTPStatus

import pytest
import requests

BASE_URL = os.environ.get("E2E_BASE_URL")
TARGET_PATH = "/admin/adminProfile/fetchProfile"


def test_unauthenticated_request_is_rejected():
    """Protected Admin APIs must reject missing authentication without leaking internals."""
    if not BASE_URL:
        pytest.fail("Missing E2E_BASE_URL")
    response = requests.get(BASE_URL.rstrip("/") + TARGET_PATH, timeout=30, allow_redirects=False)
    assert response.status_code == HTTPStatus.UNAUTHORIZED
    body = response.json()
    assert body["success"] is False
    assert body["data"] is None
    assert body["errorCode"]
    assert "stack" not in response.text.lower()
