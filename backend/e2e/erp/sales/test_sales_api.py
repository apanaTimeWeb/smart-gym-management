def test_get_sales_overview(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/sales/overview")
    assert response.status_code in [200, 404]

def test_get_membership_report(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/sales/membership-report")
    assert response.status_code in [200, 404]

def test_get_pending_payments(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/sales/pending-payments?limit=10&page=1")
    assert response.status_code in [200, 404]

def test_get_all_memberships(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/sales/all-memberships?limit=10&page=1")
    assert response.status_code in [200, 404]
