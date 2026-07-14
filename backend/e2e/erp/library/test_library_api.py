def test_get_exercises(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/library/exercises")
    assert response.status_code in [200, 404]

def test_get_diet_plans(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/library/diet-plans")
    assert response.status_code in [200, 404]
