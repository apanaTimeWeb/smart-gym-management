import uuid

def test_workout_lifecycle(auth_client, api_url):
    # Create
    create_resp = auth_client.post(f"{api_url}/erp/workout/workouts", json={
        "name": "Full Body Blaster", "level": "Beginner", "days": 3,
        "exercises": 8, "focus": "Strength", "duration": "45 mins",
        "tags": ["Full Body", "Dumbbells"]
    })
    assert create_resp.status_code == 201
    work_id = create_resp.json()["data"]["id"]

    # Get
    get_resp = auth_client.get(f"{api_url}/erp/workout/workouts/{work_id}")
    assert get_resp.status_code == 200

    # Update
    update_resp = auth_client.patch(f"{api_url}/erp/workout/workouts/{work_id}", json={
        "level": "Advanced", "days": 4
    })
    assert update_resp.status_code == 200

    # Delete
    del_resp = auth_client.delete(f"{api_url}/erp/workout/workouts/{work_id}")
    assert del_resp.status_code in [200, 204]
