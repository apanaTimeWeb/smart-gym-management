# RESPONSIBILITY: Verifies the live Trainer profile HTTP contract at the API boundary.
# FLOW: Pytest → authenticated HTTP request → status/envelope assertions → frontend-required data shape.

from __future__ import annotations

from http import HTTPStatus

import requests


def test_profile_route_returns_frontend_contract(trainer_http_context):
    base_url, headers = trainer_http_context
    response = requests.get(f"{base_url}/api/v1/trainer/profile", headers=headers, timeout=5)
    assert response.status_code == HTTPStatus.OK
    payload = response.json()
    assert payload["success"] is True
    assert isinstance(payload["message"], str) and payload["message"]
    assert payload["data"] is not None
    assert isinstance(payload['data'], dict) and {'id','name','email','phone','role'} <= payload['data'].keys()
