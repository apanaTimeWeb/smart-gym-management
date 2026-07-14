import pytest

def test_create_contact_inquiry(api_client, api_url):
    # Note: Public endpoint doesn't need auth, but we use the fixture standard
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Hello world", "date": "2026-07-20", "type": "CONTACT"
    }
    response = api_client.post(f"{api_url}/landing/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data.get('success') is True
    assert data['data']['name'] == "Test User"
    assert data['data']['type'] == "CONTACT"

def test_create_booking_inquiry(api_client, api_url):
    payload = {
        "name": "Booking User",
        "email": "book@example.com",
        "phone": "1234567890",
        "message": "Interested in joining",
        "date": "2026-07-20",
        "type": "TRIAL"
    }
    response = api_client.post(f"{api_url}/landing/booking", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data.get('success') is True
    assert data['data']['name'] == "Booking User"
    assert data['data']['type'] == "TRIAL"
