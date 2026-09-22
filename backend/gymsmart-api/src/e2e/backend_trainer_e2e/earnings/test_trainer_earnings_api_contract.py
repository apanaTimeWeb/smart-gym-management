# RESPONSIBILITY: Verifies the live Trainer earnings HTTP contract at the API boundary.
# FLOW: Pytest → authenticated HTTP request → status/envelope assertions → frontend-required data shape.

from __future__ import annotations

from http import HTTPStatus

import requests


def test_earnings_route_returns_frontend_contract(trainer_http_context):
    base_url, headers = trainer_http_context
    response = requests.get(f"{base_url}/api/v1/trainer/earnings?page=1&limit=20", headers=headers, timeout=5)
    assert response.status_code == HTTPStatus.OK
    payload = response.json()
    assert payload["success"] is True
    assert isinstance(payload["message"], str) and payload["message"]
    assert payload["data"] is not None
    assert isinstance(payload['data'], dict) and {'kpis','pendingPayouts','history','historyTotal','historyPage','historyLimit'} <= payload['data'].keys()
