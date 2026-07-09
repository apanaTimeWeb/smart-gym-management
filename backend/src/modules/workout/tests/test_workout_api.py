def test_get_all_workouts(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/workout/exercises?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_get_all_diet_plans(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/workout/diet-plans?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_create_workout(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/workout/exercises", json={
        "name": "Barbell Bench Press",
        "category": "Strength",
        "muscleGroup": "Chest",
        "equipment": "Barbell",
        "difficulty": "Intermediate",
        "instructions": "Lie on bench, grip barbell shoulder-width apart, lower to chest and press up."
    })
    assert response.status_code in [201, 401]

def test_create_diet_plan(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/workout/diet-plans", json={
        "name": "Muscle Gain Diet",
        "calories": 3200,
        "protein": 180,
        "carbs": 350,
        "fat": 90,
        "goal": "Muscle Gain",
        "description": "High-protein diet for muscle hypertrophy"
    })
    assert response.status_code in [201, 401]

def test_update_workout(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/v1/workout/exercises/1", json={
        "difficulty": "Advanced",
        "instructions": "Updated instructions..."
    })
    assert response.status_code in [200, 401, 404]

def test_update_diet_plan(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/v1/workout/diet-plans/1", json={
        "calories": 3400,
        "protein": 200
    })
    assert response.status_code in [200, 401, 404]
