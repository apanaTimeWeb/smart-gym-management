"""Landing API contract tests using isolated real tenant provisioning."""
import os
from http import HTTPStatus
from uuid import uuid4

import pytest
import requests

BASE_URL = os.getenv("BACKEND_BASE_URL", "http://127.0.0.1:3000").rstrip("/")
BOOTSTRAP_TOKEN = os.getenv("E2E_BOOTSTRAP_TOKEN")


def _assert_envelope(payload: dict, expected_message: str) -> None:
    assert payload["success"] is True
    assert payload["data"]["message"] == expected_message
    assert "error" not in payload


@pytest.fixture(scope="module")
def isolated_tenant():
    if not BOOTSTRAP_TOKEN:
        pytest.skip("E2E_BOOTSTRAP_TOKEN is not configured; isolated tenant provisioning cannot be performed safely.")

    create_response = requests.post(
        f"{BASE_URL}/test/tenants",
        headers={
            "Idempotency-Key": f"e2e-provision-{uuid4()}",
            "x-test-bootstrap-token": BOOTSTRAP_TOKEN,
        },
        timeout=20,
    )
    assert create_response.status_code == HTTPStatus.CREATED, create_response.text
    create_payload = create_response.json()
    tenant_id = create_payload["data"]["tenantId"]
    try:
        yield tenant_id
    finally:
        requests.delete(
            f"{BASE_URL}/test/tenants/{tenant_id}",
            headers={
                "Idempotency-Key": f"e2e-destroy-{uuid4()}",
                "x-test-bootstrap-token": BOOTSTRAP_TOKEN,
            },
            timeout=20,
        )


def test_landing_booking_requires_idempotency_key(isolated_tenant: str) -> None:
    response = requests.post(
        f"{BASE_URL}/landing/bookings",
        headers={"x-tenant-id": isolated_tenant, "x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        json={
            "name": "E2E Member",
            "email": "e2e-booking@example.org",
            "phone": "9876543210",
            "date": "2026-09-28T10:00:00.000Z",
            "type": "trial",
        },
        timeout=20,
    )
    assert response.status_code == HTTPStatus.BAD_REQUEST
    payload = response.json()
    assert payload["success"] is False
    assert payload["data"] is None
    assert payload["errorCode"] == "CORE.IDEMPOTENCY.KEY_REQUIRED"


def test_landing_booking_replays_same_mutation(isolated_tenant: str) -> None:
    key = f"e2e-booking-{uuid4()}"
    headers = {
        "Idempotency-Key": key,
        "x-tenant-id": isolated_tenant,
        "x-test-bootstrap-token": BOOTSTRAP_TOKEN,
    }
    body = {
        "name": "E2E Member",
        "email": "e2e-booking@example.org",
        "phone": "9876543210",
        "date": "2026-09-28T10:00:00.000Z",
        "type": "trial",
    }
    first = requests.post(f"{BASE_URL}/landing/bookings", headers=headers, json=body, timeout=20)
    second = requests.post(f"{BASE_URL}/landing/bookings", headers=headers, json=body, timeout=20)

    assert first.status_code == HTTPStatus.CREATED, first.text
    assert second.status_code == HTTPStatus.CREATED, second.text
    _assert_envelope(first.json(), "Booking submitted successfully. Our team will contact you shortly.")
    assert second.json() == first.json()


def test_landing_contact_replays_same_mutation(isolated_tenant: str) -> None:
    key = f"e2e-contact-{uuid4()}"
    headers = {
        "Idempotency-Key": key,
        "x-tenant-id": isolated_tenant,
        "x-test-bootstrap-token": BOOTSTRAP_TOKEN,
    }
    body = {
        "name": "E2E Contact",
        "email": "e2e-contact@example.org",
        "message": "Please contact me about membership plans.",
    }
    first = requests.post(f"{BASE_URL}/landing/contact", headers=headers, json=body, timeout=20)
    second = requests.post(f"{BASE_URL}/landing/contact", headers=headers, json=body, timeout=20)

    assert first.status_code == HTTPStatus.CREATED, first.text
    assert second.status_code == HTTPStatus.CREATED, second.text
    _assert_envelope(first.json(), "Message sent successfully. We will get back to you shortly.")
    assert second.json() == first.json()


def test_landing_key_reuse_with_different_payload_is_rejected(isolated_tenant: str) -> None:
    key = f"e2e-conflict-{uuid4()}"
    headers = {
        "Idempotency-Key": key,
        "x-tenant-id": isolated_tenant,
        "x-test-bootstrap-token": BOOTSTRAP_TOKEN,
    }
    first_body = {
        "name": "E2E Member A",
        "email": "e2e-conflict-a@example.org",
        "phone": "9876543210",
        "date": "2026-09-28T11:00:00.000Z",
        "type": "trial",
    }
    second_body = {**first_body, "email": "e2e-conflict-b@example.org"}

    assert requests.post(f"{BASE_URL}/landing/bookings", headers=headers, json=first_body, timeout=20).status_code == HTTPStatus.CREATED
    second = requests.post(f"{BASE_URL}/landing/bookings", headers=headers, json=second_body, timeout=20)
    assert second.status_code == HTTPStatus.CONFLICT
    payload = second.json()
    assert payload["success"] is False
    assert payload["data"] is None
    assert payload["errorCode"] == "CORE.IDEMPOTENCY.KEY_REUSE"


def test_landing_booking_rejects_overlong_idempotency_key(isolated_tenant: str) -> None:
    response = requests.post(
        f"{BASE_URL}/landing/bookings",
        headers={
            "Idempotency-Key": "x" * 256,
            "x-tenant-id": isolated_tenant,
            "x-test-bootstrap-token": BOOTSTRAP_TOKEN,
        },
        json={
            "name": "E2E Key Boundary",
            "email": "e2e-key@example.org",
            "phone": "9876543210",
            "date": "2026-09-28T12:00:00.000Z",
            "type": "trial",
        },
        timeout=20,
    )
    assert response.status_code == HTTPStatus.BAD_REQUEST, response.text
    payload = response.json()
    assert payload["success"] is False
    assert payload["data"] is None
    assert payload["errorCode"] == "CORE.IDEMPOTENCY.KEY_INVALID"


def test_landing_rejects_malformed_tenant_identifier(isolated_tenant: str) -> None:
    response = requests.post(
        f"{BASE_URL}/landing/bookings",
        headers={
            "Idempotency-Key": f"e2e-tenant-format-{uuid4()}",
            "x-tenant-id": "not-a-uuid",
            "x-test-bootstrap-token": BOOTSTRAP_TOKEN,
        },
        json={
            "name": "E2E Tenant Guard",
            "email": "e2e-tenant@example.org",
            "phone": "9876543210",
            "date": "2026-09-28T13:00:00.000Z",
            "type": "trial",
        },
        timeout=20,
    )
    assert response.status_code == HTTPStatus.FORBIDDEN, response.text
    payload = response.json()
    assert payload["success"] is False
    assert payload["data"] is None
    assert payload["errorCode"] == "HTTP.REQUEST.FAILED"


def test_test_tenant_destroy_key_reuse_across_targets_is_rejected() -> None:
    if not BOOTSTRAP_TOKEN:
        pytest.skip("E2E_BOOTSTRAP_TOKEN is not configured; isolated tenant lifecycle cannot be exercised safely.")
    key = f"e2e-destroy-key-reuse-{uuid4()}"
    first = requests.post(
        f"{BASE_URL}/test/tenants",
        headers={"Idempotency-Key": key, "x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        timeout=20,
    )
    assert first.status_code == HTTPStatus.CREATED, first.text
    first_tenant = first.json()["data"]["tenantId"]
    second = requests.post(
        f"{BASE_URL}/test/tenants",
        headers={"Idempotency-Key": key, "x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        timeout=20,
    )
    assert second.status_code == HTTPStatus.CREATED, second.text
    assert second.json() == first.json()
    requests.delete(
        f"{BASE_URL}/test/tenants/{first_tenant}",
        headers={"Idempotency-Key": f"cleanup-{uuid4()}", "x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        timeout=20,
    )


def test_test_tenant_destroy_key_is_bound_to_target(isolated_tenant: str) -> None:
    if not BOOTSTRAP_TOKEN:
        pytest.skip("E2E_BOOTSTRAP_TOKEN is not configured; isolated tenant lifecycle cannot be exercised safely.")
    other = requests.post(
        f"{BASE_URL}/test/tenants",
        headers={"Idempotency-Key": f"e2e-destroy-other-{uuid4()}", "x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        timeout=20,
    )
    assert other.status_code == HTTPStatus.CREATED, other.text
    other_tenant = other.json()["data"]["tenantId"]
    key = f"e2e-destroy-bound-{uuid4()}"
    first = requests.delete(
        f"{BASE_URL}/test/tenants/{isolated_tenant}",
        headers={"Idempotency-Key": key, "x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        timeout=20,
    )
    assert first.status_code == HTTPStatus.OK, first.text
    second = requests.delete(
        f"{BASE_URL}/test/tenants/{other_tenant}",
        headers={"Idempotency-Key": key, "x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        timeout=20,
    )
    assert second.status_code == HTTPStatus.CONFLICT, second.text
    assert second.json()["errorCode"] == "CORE.IDEMPOTENCY.KEY_REUSE"
    requests.delete(
        f"{BASE_URL}/test/tenants/{other_tenant}",
        headers={"Idempotency-Key": f"cleanup-{uuid4()}", "x-test-bootstrap-token": BOOTSTRAP_TOKEN},
        timeout=20,
    )
