from http import HTTPStatus
import uuid

def test_get_all_payments(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/finance/payments?page=1&limit=20")
    assert response.status_code == HTTPStatus.OK

def test_get_finance_summary(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/finance/summary")
    assert response.status_code == HTTPStatus.OK

def test_payment_lifecycle(auth_client, api_url):
    # Setup Member first
    plan_resp = auth_client.post(f"{api_url}/erp/plans", json={
        "name": "Finance Plan", "tier": "PREMIUM", "price1Month": 3000, "price3Month": 8000,
        "price6Month": 14000, "price12Month": 25000, "priceCustom": 0, "features": ["24/7 Access"], "isActive": True
    })
    plan_id = plan_resp.json()["data"]["id"] if plan_resp.status_code == HTTPStatus.CREATED else "1"
    
    member_resp = auth_client.post(f"{api_url}/erp/members", json={
        "name": "Finance Rahul", "email": "finance@gmail.com", "phone": "+91 98765 43210",
        "gender": "MALE", "address": "Andheri West, Mumbai", "planId": plan_id,
        "billingCycle": "ONE_MONTH", "joinDate": "2026-07-09"
    })
    member_id = member_resp.json()["data"]["id"] if member_resp.status_code == HTTPStatus.CREATED else "1"

    # Test Create Payment
    pay_resp = auth_client.post(f"{api_url}/erp/finance/payments", json={
        "memberId": member_id, "amount": 2500, "method": "UPI", "notes": "Monthly membership renewal"
    })
    assert pay_resp.status_code == HTTPStatus.CREATED
    pay_id = pay_resp.json().get("data", {}).get("id")

    if pay_id:
        get_resp = auth_client.get(f"{api_url}/erp/finance/payments/member/{member_id}")
        assert get_resp.status_code == HTTPStatus.OK
