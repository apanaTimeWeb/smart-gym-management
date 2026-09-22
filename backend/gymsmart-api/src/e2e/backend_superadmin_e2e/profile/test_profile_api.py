# RESPONSIBILITY: Black-box API contract tests for profile; no internal implementation knowledge.
# FLOW: pytest client -> live /api/v1 endpoint -> canonical ApiResponse assertions.
from http import HTTPStatus
import os
import requests

BASE_URL = os.getenv("API_BASE_URL", "http://localhost:3000/api/v1")

def test_profile_list_contract() -> None:
    response = requests.get(f"{BASE_URL}/superadmin/profile", timeout=5)
    assert response.status_code in {HTTPStatus.OK, HTTPStatus.UNAUTHORIZED}
    if response.status_code == HTTPStatus.OK:
        payload = response.json()
        assert payload["success"] is True
        assert "data" in payload
