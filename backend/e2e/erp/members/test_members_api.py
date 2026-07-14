import uuid

def test_get_member_stats(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/members/stats")
    assert response.status_code == 200

def test_member_lifecycle(auth_client, api_url):
    plan_resp = auth_client.post(f"{api_url}/erp/plans", json={
        "name": f"Member Plan {uuid.uuid4().hex[:8]}", "tier": "PREMIUM", "price1Month": 3000, "price3Month": 8000,
        "price6Month": 14000, "price12Month": 25000, "priceCustom": 0, "features": ["24/7 Access"], "isActive": True
    })
    if plan_resp.status_code == 409:
        plans = auth_client.get(f"{api_url}/erp/plans").json()
        plan_id = next((p["id"] for p in plans["data"] if p["tier"] == "PREMIUM"), "1")
    else:
        plan_id = plan_resp.json()["data"]["id"] if plan_resp.status_code == 201 else "1"


    # Create
    create_resp = auth_client.post(f"{api_url}/erp/members", json={
        "name": "Rahul Sharma", "email": f"rahul_{uuid.uuid4().hex[:8]}@gmail.com", "phone": "+91 98765 43210",
        "gender": "MALE", "address": "Andheri West, Mumbai", "planId": plan_id,
        "billingCycle": "ONE_MONTH", "joinDate": "2026-07-09"
    })
    assert create_resp.status_code == 201
    member_id = create_resp.json()["data"]["id"]

    # Get
    get_resp = auth_client.get(f"{api_url}/erp/members/{member_id}")
    assert get_resp.status_code == 200

    # Update
    update_resp = auth_client.patch(f"{api_url}/erp/members/{member_id}", json={
        "phone": "+91 91234 56789", "address": "Bandra East, Mumbai"
    })
    assert update_resp.status_code == 200

    # Delete
    del_resp = auth_client.delete(f"{api_url}/erp/members/{member_id}")
    assert del_resp.status_code in [200, 204]
