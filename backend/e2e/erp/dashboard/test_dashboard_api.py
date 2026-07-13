def test_get_dashboard_kpis(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/dashboard/kpi")
    assert response.status_code in [200, 401]

def test_get_dashboard_charts(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/dashboard/charts")
    assert response.status_code in [200, 401]

def test_get_recent_activity(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/dashboard/recent")
    assert response.status_code in [200, 401]
