import os
from dataclasses import dataclass
import pytest
import requests

@dataclass
class ApiSession:
    base_url: str
    access_token: str
    tenant_id: str

    def get(self, path: str):
        return requests.get(f'{self.base_url}{path}', headers={'Authorization': f'Bearer {self.access_token}', 'x-tenant-id': self.tenant_id}, timeout=5)

@pytest.fixture(scope='session')
def api_session():
    base_url = os.getenv('E2E_BASE_URL', 'http://localhost:3000/api/v1').rstrip('/')
    email = os.getenv('E2E_ADMIN_EMAIL', 'admin@example.com')
    password = os.getenv('E2E_ADMIN_PASSWORD', 'ChangeMe123!')
    tenant_id = os.getenv('E2E_TENANT_ID', '00000000-0000-0000-0000-000000000001')
    result = requests.post(f'{base_url}/auth/login', json={'email': email, 'password': password}, timeout=5)
    result.raise_for_status()
    payload = result.json()
    assert payload.get('success') is True
    return ApiSession(base_url, payload['data']['accessToken'], tenant_id)
