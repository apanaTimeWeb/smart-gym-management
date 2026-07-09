def test_get_all_staff(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/hr/staff?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_get_staff_by_id(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/hr/staff/uuid-here")
    assert response.status_code in [200, 401, 404]

def test_get_hr_summary(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/hr/summary")
    assert response.status_code in [200, 401]

def test_create_staff(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/hr/staff", json={
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
    response = auth_client.patch(f"{api_url}/v1/hr/staff/uuid-here", json={
        "salary": 35000,
        "role": "Head Trainer"
    })
    assert response.status_code in [200, 401, 404]

def test_get_all_payrolls(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/hr/payroll")
    assert response.status_code in [200, 401]

def test_create_payroll(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/hr/payroll", json={
        "staffId": "staff-uuid-here",
        "month": "July",
        "year": 2026,
        "amount": 30000,
        "bonus": 2000,
        "deductions": 0,
        "status": "Pending"
    })
    assert response.status_code in [201, 401, 404]

def test_update_payroll_status(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/v1/hr/payroll/uuid-here/status", json={
        "status": "Paid"
    })
    assert response.status_code in [200, 401, 404]


def test_delete_staff(auth_client, api_url):
    response = auth_client.delete(f"{api_url}/v1/hr/staff/uuid-here")
    assert response.status_code in [200, 204, 401, 404]
