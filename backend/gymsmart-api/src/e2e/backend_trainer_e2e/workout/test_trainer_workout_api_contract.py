# RESPONSIBILITY: Verifies the live Trainer workout HTTP contract at the API boundary.
# FLOW: Pytest → authenticated HTTP request → status/envelope assertions → frontend-required data shape.

from __future__ import annotations

import uuid
from http import HTTPStatus

import requests


def test_workout_route_returns_frontend_contract(trainer_http_context):
    base_url, headers = trainer_http_context
    response = requests.get(f"{base_url}/api/v1/trainer/workout/workouts?page=1&limit=20", headers=headers, timeout=5)
    assert response.status_code == HTTPStatus.OK
    payload = response.json()
    assert payload["success"] is True
    assert isinstance(payload["message"], str) and payload["message"]
    assert payload["data"] is not None
    assert isinstance(payload['data'], dict) and {'workouts','total'} <= payload['data'].keys()


def test_workout_create_get_patch_delete_lifecycle(trainer_http_context):
    base_url, headers = trainer_http_context
    create_headers = {**headers, "Idempotency-Key": f"e2e-workout-create-{uuid.uuid4()}"}
    body = {"name": f"E2E {uuid.uuid4().hex[:8]}", "level": "Beginner", "days": 3, "exercises": 1, "focus": "Strength", "duration": "30 min", "tags": "e2e", "instructions": "temporary test fixture"}
    created = requests.post(f"{base_url}/api/v1/trainer/workout/workouts", json=body, headers=create_headers, timeout=5)
    assert created.status_code == HTTPStatus.CREATED, created.text
    workout_id = created.json()["data"]["id"]
    try:
        fetched = requests.get(f"{base_url}/api/v1/trainer/workout/workouts/{workout_id}", headers=headers, timeout=5)
        assert fetched.status_code == HTTPStatus.OK
        patched = requests.patch(f"{base_url}/api/v1/trainer/workout/workouts/{workout_id}", json={"name": body["name"] + " updated"}, headers={**headers, "Idempotency-Key": f"e2e-workout-patch-{uuid.uuid4()}"}, timeout=5)
        assert patched.status_code == HTTPStatus.OK, patched.text
    finally:
        deleted = requests.delete(f"{base_url}/api/v1/trainer/workout/workouts/{workout_id}", headers={**headers, "Idempotency-Key": f"e2e-workout-delete-{uuid.uuid4()}"}, timeout=5)
        assert deleted.status_code == HTTPStatus.OK, deleted.text
    missing = requests.get(f"{base_url}/api/v1/trainer/workout/workouts/{workout_id}", headers=headers, timeout=5)
    assert missing.status_code == HTTPStatus.NOT_FOUND
