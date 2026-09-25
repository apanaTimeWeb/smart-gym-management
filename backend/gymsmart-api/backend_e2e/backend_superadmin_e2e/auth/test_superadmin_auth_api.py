import os
from http import HTTPStatus
import httpx
import pytest

BASE_URL = os.environ.get("SUPERADMIN_E2E_BASE_URL", "http://localhost:3000").rstrip("/")
EMAIL = os.environ.get("SUPERADMIN_E2E_EMAIL")
PASSWORD = os.environ.get("SUPERADMIN_E2E_PASSWORD")


def _headers():
    token = os.environ.get("SUPERADMIN_E2E_ACCESS_TOKEN")
    return {"Authorization": f"Bearer {token}"} if token else {}


def test_invalid_access_token_is_rejected():
    try:
        response = httpx.get(f"{BASE_URL}/superadmin/dashboard", headers={"Authorization": "Bearer invalid-token"}, timeout=10)
    except (httpx.ConnectError, httpx.ConnectTimeout):
        pytest.skip("Live backend is unavailable for runtime E2E verification")
    assert response.status_code == HTTPStatus.UNAUTHORIZED
    payload = response.json()
    assert payload["success"] is False
    assert payload["data"] is None
    assert payload["errorCode"].startswith("CORE.")


def test_real_login_requires_runtime_credentials():
    if not EMAIL or not PASSWORD:
        pytest.skip("Runtime credentials/IDs were not supplied")
    response = httpx.post(f"{BASE_URL}/auth/login", json={"email": EMAIL, "password": PASSWORD}, timeout=10)
    assert response.status_code == HTTPStatus.OK
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"]["accessToken"]
    assert payload["data"]["refreshToken"]
