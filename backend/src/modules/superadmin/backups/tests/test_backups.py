import pytest
import requests

BASE_URL = "http://localhost:3000/api/superadmin/backups"

def test_get_backups():
    response = requests.get(BASE_URL)
    assert response.status_code in [200, 401, 403]
