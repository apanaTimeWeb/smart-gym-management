def test_get_all_workouts(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/workout/workouts?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_create_workout(auth_client, api_url):
    response = auth_client.post(f"{api_url}/erp/workout/workouts", json={
        "name": "Full Body Blaster",
        "level": "Beginner",
        "days": 3,
        "exercises": 8,
        "focus": "Strength",
        "duration": "45 mins",
        "tags": ["Full Body", "Dumbbells"]
    })
    assert response.status_code in [201, 401]

def test_update_workout(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/erp/workout/workouts/1", json={
        "level": "Advanced",
        "days": 4
    })
    assert response.status_code in [200, 401, 404]

def test_get_workout_by_id(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/workout/workouts/1")
    assert response.status_code in [200, 401, 404]

def test_delete_workout(auth_client, api_url):
    response = auth_client.delete(f"{api_url}/erp/workout/workouts/1")
    assert response.status_code in [200, 204, 401, 404]
