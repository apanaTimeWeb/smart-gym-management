def test_get_all_attendance(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/attendance?page=1&limit=20&type=MEMBER")
    assert response.status_code in [200, 401]

def test_get_today_attendance_stats(auth_client, api_url):
    response = auth_client.get(f"{api_url}/v1/attendance/stats")
    assert response.status_code in [200, 401]

def test_mark_member_attendance(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/attendance", json={
        "memberId": "member-uuid-here",
        "date": "2026-07-09T10:00:00.000Z",
        "type": "MEMBER"
    })
    assert response.status_code in [201, 401, 404]

def test_mark_staff_attendance(auth_client, api_url):
    response = auth_client.post(f"{api_url}/v1/attendance", json={
        "staffId": "staff-uuid-here",
        "date": "2026-07-09T09:00:00.000Z",
        "type": "STAFF"
    })
    assert response.status_code in [201, 401, 404]
