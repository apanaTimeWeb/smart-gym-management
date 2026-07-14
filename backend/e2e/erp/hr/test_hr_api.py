import uuid

def test_get_hr_summary(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/hr/summary")
    assert response.status_code == 200

def test_staff_lifecycle(auth_client, api_url):
    # Test Create
    create_resp = auth_client.post(f"{api_url}/erp/hr/staff", json={
        "name": "Vikas Singh", "email": f"vikas_{uuid.uuid4().hex[:8]}@gymsmart.com", 
        "phone": "+91 93456 78901", "role": "Personal Trainer", "salary": 30000, 
        "branch": "Main Branch", "gender": "MALE", "joinDate": "2026-07-01"
    })
    assert create_resp.status_code == 201
    staff_id = create_resp.json()["data"]["id"]

    # Test Get
    get_resp = auth_client.get(f"{api_url}/erp/hr/staff/{staff_id}")
    assert get_resp.status_code == 200

    # Test Update
    update_resp = auth_client.patch(f"{api_url}/erp/hr/staff/{staff_id}", json={
        "salary": 35000, "role": "Head Trainer"
    })
    assert update_resp.status_code == 200

    # Test Delete
    del_resp = auth_client.delete(f"{api_url}/erp/hr/staff/{staff_id}")
    assert del_resp.status_code in [200, 204]

def test_payroll_lifecycle(auth_client, api_url):
    create_resp = auth_client.post(f"{api_url}/erp/hr/staff", json={
        "name": "Payroll Singh", "email": f"payroll_{uuid.uuid4().hex[:8]}@gymsmart.com", 
        "phone": "+91 93456 78901", "role": "Personal Trainer", "salary": 30000, 
        "branch": "Main Branch", "gender": "MALE", "joinDate": "2026-07-01"
    })
    assert create_resp.status_code == 201
    staff_id = create_resp.json()["data"]["id"]

    # Test Create Payroll
    pay_resp = auth_client.post(f"{api_url}/erp/hr/payrolls", json={
        "staffId": staff_id, "month": "July", "amount": 30000, "status": "Pending"
    })
    assert pay_resp.status_code == 201
    pay_id = pay_resp.json()["data"]["id"]

    # Test Update Payroll
    update_resp = auth_client.patch(f"{api_url}/erp/hr/payrolls/{pay_id}/status", json={
        "status": "Paid"
    })
    assert update_resp.status_code == 200
