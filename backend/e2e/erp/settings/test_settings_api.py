def test_get_settings(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/settings")
    assert response.status_code in [200, 401]

def test_update_settings(auth_client, api_url):
    response = auth_client.post(f"{api_url}/erp/settings", json={
        "gymName": "GymSmart Pro Fitness",
        "ownerName": "Satya Swarup",
        "phone": "+91 98765 43210",
        "email": "admin@gymsmart.com",
        "city": "Mumbai"
    })
    assert response.status_code in [200, 201, 401]
