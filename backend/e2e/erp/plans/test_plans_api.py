import uuid

def test_plan_lifecycle(auth_client, api_url):
    # Create
    create_resp = auth_client.post(f"{api_url}/erp/plans", json={
        "name": f"Diamond {uuid.uuid4().hex[:8]}", "tier": "PREMIUM", "price1Month": 3000, "price3Month": 8000,
        "price6Month": 14000, "price12Month": 25000, "priceCustom": 0,
        "features": ["24/7 Access", "Personal Trainer", "Spa Access"], "isActive": True
    })
    if create_resp.status_code == 409:
        plans_resp = auth_client.get(f"{api_url}/erp/plans")
        plan_id = next(p['id'] for p in plans_resp.json()['data'] if p['tier'] == 'PREMIUM')
    else:
        assert create_resp.status_code == 201
        plan_id = create_resp.json()["data"]["id"]

    # Get
    get_resp = auth_client.get(f"{api_url}/erp/plans/{plan_id}")
    assert get_resp.status_code == 200

    # Update
    update_resp = auth_client.patch(f"{api_url}/erp/plans/{plan_id}", json={
        "isActive": False
    })
    assert update_resp.status_code == 200

    # Delete
    del_resp = auth_client.delete(f"{api_url}/erp/plans/{plan_id}")
    assert del_resp.status_code in [200, 204]
