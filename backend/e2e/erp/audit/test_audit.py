from http import HTTPStatus
import uuid

def test_create_audit(auth_client, api_url):
    unique_val = f"test_{uuid.uuid4().hex[:8]}"
    create_resp = auth_client.post(f"{api_url}/erp/audit", json={
        "action": f"Test Create {unique_val}",
        "entityType": "E2E_TEST",
        "actorRole": "SYSTEM",
    })
    assert create_resp.status_code == HTTPStatus.CREATED

def test_get_all_audits(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/audit?page=1&limit=20")
    assert response.status_code == HTTPStatus.OK
