import pytest
import requests

BASE_URL = "http://localhost:3000/api/erp/audit"

def test_get_audit_logs():
    # Example e2e test for GET /audit
    # Note: Assumes server is running and we can fetch audit logs
    response = requests.get(BASE_URL)
    
    # Assert HTTP status is OK
    assert response.status_code == 200 or response.status_code == 401
    
    # Assert standardized envelope (if authorized)
    if response.status_code == 200:
        data = response.json()
        assert "success" in data
        assert "data" in data
