def test_login_non_existent_email(api_client, api_url):
    response = api_client.post(f"{api_url}/auth/login", json={
        "email": "wrong@test.com",
        "password": "wrong"
    })
    assert response.status_code == 400

def test_login_incorrect_password(api_client, api_url):
    # Using the seed user's email with wrong password
    response = api_client.post(f"{api_url}/auth/login", json={
        "email": "admin@gymsmart.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401

def test_login_correct_credentials(api_client, api_url):
    # Using the seed user
    response = api_client.post(f"{api_url}/auth/login", json={
        "email": "admin@gymsmart.com",
        "password": "superadmin123"
    })
    assert response.status_code == 200
    data = response.json().get("data", {})
    assert "accessToken" in data
    assert data.get("user", {}).get("email") == "admin@gymsmart.com"

def test_get_me_no_token(api_client, api_url):
    response = api_client.get(f"{api_url}/auth/me")
    assert response.status_code == 401

def test_get_me_invalid_token(api_client, api_url):
    response = api_client.get(f"{api_url}/auth/me", headers={
        "Authorization": "Bearer invalidtoken"
    })
    assert response.status_code == 401

def test_get_me_valid_token(api_client, api_url):
    # First, login to get a valid token
    login_response = api_client.post(f"{api_url}/auth/login", json={
        "email": "admin@gymsmart.com",
        "password": "superadmin123"
    })
    assert login_response.status_code == 200
    token = login_response.json().get("data", {}).get("accessToken")
    assert token is not None

    # Now, use the token to get /me
    response = api_client.get(f"{api_url}/auth/me", headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 200
    data = response.json().get("data", {})
    assert data.get("email") is not None
