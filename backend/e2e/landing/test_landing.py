import pytest

@pytest.mark.asyncio
async def test_create_contact_inquiry(api_client, superadmin_token):
    # Note: Public endpoint doesn't need auth, but we use the fixture standard
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Hello world"
    }
    response = await api_client.post('/landing/contact', json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data['success'] is True
    assert data['data']['name'] == "Test User"
    assert data['data']['type'] == "CONTACT"

@pytest.mark.asyncio
async def test_create_booking_inquiry(api_client):
    payload = {
        "name": "Booking User",
        "email": "book@example.com",
        "phone": "1234567890",
        "date": "2026-12-01T10:00:00Z"
    }
    response = await api_client.post('/landing/booking', json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data['success'] is True
    assert data['data']['name'] == "Booking User"
    assert data['data']['type'] == "BOOKING"
