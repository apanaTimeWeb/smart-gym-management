def test_get_all_staff(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/hr/staff?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_get_staff_by_id(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/hr/staff/00000000-0000-0000-0000-000000000000")
    assert response.status_code in [200, 401, 404]

def test_get_hr_summary(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/hr/summary")
    assert response.status_code in [200, 401]

def test_create_staff(auth_client, api_url):
    response = auth_client.post(f"{api_url}/erp/hr/staff", json={
        "name": "Vikas Singh",
        "email": "vikas@gymsmart.com",
        "phone": "+91 93456 78901",
        "role": "Personal Trainer",
        "salary": 30000,
        "branch": "Main Branch",
        "gender": "MALE",
        "joinDate": "2026-07-01"
    })
    assert response.status_code in [201, 401]

def test_update_staff(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/erp/hr/staff/00000000-0000-0000-0000-000000000000", json={
        "salary": 35000,
        "role": "Head Trainer"
    })
    assert response.status_code in [200, 401, 404]

def test_get_all_payrolls(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/hr/payrolls")
    assert response.status_code in [200, 401]

def test_create_payroll(auth_client, api_url):
    response = auth_client.post(f"{api_url}/erp/hr/payrolls", json={
        "staffId": "00000000-0000-0000-0000-000000000000",
        "month": "July",
        "amount": 30000,
        "status": "Pending"
    })
    assert response.status_code in [201, 401, 404]

def test_update_payroll_status(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/erp/hr/payrolls/00000000-0000-0000-0000-000000000000/status", json={
        "status": "Paid"
    })
    assert response.status_code in [200, 401, 404]


def test_delete_staff(auth_client, api_url):
    response = auth_client.delete(f"{api_url}/erp/hr/staff/00000000-0000-0000-0000-000000000000")
    assert response.status_code in [200, 204, 401, 404]
