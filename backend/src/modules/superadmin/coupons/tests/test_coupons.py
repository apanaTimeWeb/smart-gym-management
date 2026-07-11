import pytest
import requests

BASE_URL = "http://localhost:3000/api/superadmin/coupons"

def test_get_coupons():
    response = requests.get(BASE_URL)
    assert response.status_code in [200, 401, 403]
