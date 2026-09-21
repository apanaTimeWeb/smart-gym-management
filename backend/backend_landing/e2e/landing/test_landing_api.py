# RESPONSIBILITY: Proves observable Landing HTTP lifecycle behavior against a running API.
# FLOW: Pytest → HTTP request → canonical response → persistence-visible lifecycle assertions.
import requests


def test_booking_api_contract(api, unique_email):
    headers = {
        "Content-Type": "application/json",
        "x-tenant-id": api["tenant_id"],
        "Idempotency-Key": f"booking-{unique_email}",
    }
    payload = {
        "name": "E2E Member",
        "email": unique_email,
        "phone": "9876543210",
        "date": "2026-09-21T00:00:00.000Z",
        "type": "trial",
    }
    response = requests.post(
        f'{api["base_url"]}/api/v1/landing/booking',
        json=payload,
        headers=headers,
        timeout=10,
    )
    assert response.status_code == 201
    body = response.json()
    assert body["success"] is True
    assert body["message"]
    assert body["data"] is None

    replay = requests.post(
        f'{api["base_url"]}/api/v1/landing/booking',
        json=payload,
        headers=headers,
        timeout=10,
    )
    assert replay.status_code == 201
    assert replay.json() == body


def test_contact_validation_contract(api, unique_email):
    response = requests.post(
        f'{api["base_url"]}/api/v1/landing/contact',
        json={"name": "", "email": "bad", "message": ""},
        headers={"x-tenant-id": api["tenant_id"]},
        timeout=10,
    )
    assert response.status_code == 400
    body = response.json()
    assert body["success"] is False
    assert body["data"] is None
    assert body["errorCode"] == "VALIDATION.DTO.FAILED"
    assert isinstance(body["validationErrors"], list)
