def test_get_all_payments(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/finance/payments?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_get_finance_summary(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/finance/summary")
    assert response.status_code in [200, 401]

def test_get_payments_by_member(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/finance/payments/member/member-00000000-0000-0000-0000-000000000000")
    assert response.status_code in [200, 401, 404]

def test_create_payment(auth_client, api_url):
    response = auth_client.post(f"{api_url}/erp/finance/payments", json={
        "memberId": "member-00000000-0000-0000-0000-000000000000",
        "amount": 2500,
        "method": "UPI",
        "notes": "Monthly membership renewal"
    })
    assert response.status_code in [201, 401, 404]
