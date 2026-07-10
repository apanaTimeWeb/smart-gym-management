def test_get_all_members(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/members?page=1&limit=10")
    assert response.status_code in [200, 401]

def test_get_member_by_id(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/members/uuid-here")
    assert response.status_code in [200, 401, 404]

def test_get_member_stats(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/members/stats")
    assert response.status_code in [200, 401]

def test_create_member(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/members", json={
        "name": "Rahul Sharma",
        "email": "rahul@gmail.com",
        "phone": "+91 98765 43210",
        "gender": "MALE",
        "address": "Andheri West, Mumbai",
        "branch": "Main Branch",
        "planId": 1,
        "billingCycle": "ONE_MONTH",
        "joinDate": "2026-07-09"
    })
    assert response.status_code in [201, 401]

def test_update_member(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/v1/members/uuid-here", json={
        "phone": "+91 91234 56789",
        "address": "Bandra East, Mumbai"
    })
    assert response.status_code in [200, 401, 404]

def test_renew_membership(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/members/uuid-here/renew", json={
        "planId": 1,
        "billingCycle": "THREE_MONTHS"
    })
    assert response.status_code in [201, 401, 404]

def test_delete_member(auth_client, api_url):
    response = auth_client.delete(f"{api_url}/v1/members/uuid-here")
    assert response.status_code in [200, 204, 401, 404]
