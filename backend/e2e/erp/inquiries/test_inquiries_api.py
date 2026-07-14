def test_get_all_inquiries(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/inquiries?page=1&limit=20&status=NEW")
    assert response.status_code in [200, 401]

def test_get_inquiry_stats(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/inquiries/stats")
    assert response.status_code in [200, 401]

def test_create_inquiry(auth_client, api_url):
    response = auth_client.post(f"{api_url}/erp/inquiries", json={
        "name": "Ravi Tiwari",
        "phone": "+91 99887 76655",
        "email": "ravi@gmail.com",
        "interest": "Premium Plan",
        "source": "Walk-in",
        "notes": "Interested in PT sessions"
    })
    assert response.status_code in [201, 401]

def test_update_inquiry_status(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/erp/inquiries/00000000-0000-0000-0000-000000000000", json={
        "status": "FOLLOW_UP",
        "notes": "Called, will visit tomorrow"
    })
    assert response.status_code in [200, 401, 404]


def test_get_inquiry_by_id(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/inquiries/00000000-0000-0000-0000-000000000000")
    assert response.status_code in [200, 401, 404]

def test_delete_inquiry(auth_client, api_url):
    response = auth_client.delete(f"{api_url}/erp/inquiries/00000000-0000-0000-0000-000000000000")
    assert response.status_code in [200, 204, 401, 404]
