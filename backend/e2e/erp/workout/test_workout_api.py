from http import HTTPStatus
import uuid

def test_workout_lifecycle(auth_client, api_url):
    # Create
    create_resp = auth_client.post(f"{api_url}/erp/workout/workouts", json={
        "name": "Full Body Blaster", "level": "Beginner", "days": 3,
        "exercises": 8, "focus": "Strength", "duration": "45 mins",
        "tags": ["Full Body", "Dumbbells"]
    })
    assert create_resp.status_code == HTTPStatus.CREATED
    work_id = create_resp.json()["data"]["id"]

