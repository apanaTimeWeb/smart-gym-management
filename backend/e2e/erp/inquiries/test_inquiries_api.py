import uuid

def test_get_inquiry_stats(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/inquiries/meta/stats")
    assert response.status_code == 200

def test_inquiry_lifecycle(auth_client, api_url):
    # Create
    create_resp = auth_client.post(f"{api_url}/erp/inquiries", json={
        "name": "Ravi Tiwari", "phone": "+91 99887 76655", "email": f"ravi_{uuid.uuid4().hex[:8]}@gmail.com",
        "interest": "Premium Plan", "source": "Walk-in", "notes": "Interested in PT sessions"
    })
    assert create_resp.status_code == 201
    inq_id = create_resp.json()["data"]["id"]

    # Get
    get_resp = auth_client.get(f"{api_url}/erp/inquiries/{inq_id}")
    assert get_resp.status_code == 200

    # Update
    update_resp = auth_client.patch(f"{api_url}/erp/inquiries/{inq_id}", json={
        "status": "FOLLOW_UP", "notes": "Called, will visit tomorrow"
    })
    assert update_resp.status_code == 200

    # Delete
    del_resp = auth_client.delete(f"{api_url}/erp/inquiries/{inq_id}")
    assert del_resp.status_code in [200, 204]
