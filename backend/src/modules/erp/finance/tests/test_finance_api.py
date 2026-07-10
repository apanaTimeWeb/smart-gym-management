def test_get_all_payments(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/finance/payments?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_get_finance_summary(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/finance/summary")
    assert response.status_code in [200, 401]

def test_get_payments_by_member(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/finance/payments/member/member-uuid-here")
    assert response.status_code in [200, 401, 404]

def test_create_payment(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/finance/payments", json={
        "memberId": "member-uuid-here",
        "amount": 2500,
        "method": "UPI",
        "notes": "Monthly membership renewal"
    })
    assert response.status_code in [201, 401, 404]
