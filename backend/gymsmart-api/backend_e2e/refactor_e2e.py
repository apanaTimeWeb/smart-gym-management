import os
import glob
import re

admin_e2e_path = r"c:\Users\satya\Desktop\PojectsToWork\Smart-Gym-Management\backend\gymsmart-api\backend_e2e\backend_admin_e2e"

template = """# RESPONSIBILITY: Black-box API contract verification for the Admin {module_name} module.
# FLOW: pytest -> real HTTP request -> running backend controller -> canonical response assertions.
# MODULE: admin_{module_name}
# RULE: API/E2E tests use pytest and real HTTP; no database mocking.

import os
from http import HTTPStatus
import httpx
import pytest

BASE_URL = os.environ.get("E2E_BASE_URL", "http://localhost:3000").rstrip("/")
TOKEN = os.environ.get("E2E_ACCESS_TOKEN")
TENANT_ID = os.environ.get("E2E_TENANT_ID")

ROUTES = {routes}
MUTATION_ROUTES = {mutation_routes}

def _headers() -> dict[str, str]:
    if not TOKEN:
        return {{}}
    headers = {{"Authorization": f"Bearer {{TOKEN}}"}}
    if TENANT_ID:
        headers["x-tenant-id"] = TENANT_ID
    return headers

def _assert_envelope(response: httpx.Response) -> None:
    assert response.status_code == HTTPStatus.OK, response.text
    payload = response.json()
    assert payload.get("success") is True, payload
    assert isinstance(payload.get("message"), str) and payload["message"].strip()
    assert "data" in payload

{read_test}

{mutation_test}
"""

read_test_template = """@pytest.mark.parametrize("path", ROUTES)
def test_admin_{module_name}_read_contract(path: str) -> None:
    if not TOKEN:
        pytest.skip("E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.get(f"{{BASE_URL}}{{path}}", headers=_headers(), timeout=10)
    _assert_envelope(response)"""

mutation_test_template = """@pytest.mark.parametrize("method,path", MUTATION_ROUTES)
def test_admin_{module_name}_mutation_requires_idempotency_key(method: str, path: str) -> None:
    if not TOKEN:
        pytest.skip("E2E_ACCESS_TOKEN is required for live API verification")
    response = httpx.request(method, f"{{BASE_URL}}{{path.replace('{{{{id}}}}', '00000000-0000-4000-8000-000000000001')}}", headers=_headers(), timeout=10)
    assert response.status_code == HTTPStatus.BAD_REQUEST, response.text
    payload = response.json()
    assert payload.get("success") is False, payload
    assert payload.get("data") is None, payload
    assert payload.get("errorCode"), payload"""

for filepath in glob.glob(os.path.join(admin_e2e_path, "*", "test_admin_*_api.py")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r'@pytest\.mark\.parametrize\("name,method,path", \[(.*?)\]', content, re.DOTALL)
    if not match:
        continue
    
    tuples_str = match.group(1)
    route_matches = re.findall(r"\(\s*'[^']*'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\)", tuples_str)
    
    routes = []
    mutation_routes = []
    for method, path in route_matches:
        if method == "GET":
            routes.append(path)
        else:
            mutation_routes.append((method, path))
            
    module_name = os.path.basename(os.path.dirname(filepath))
    
    read_test = read_test_template.format(module_name=module_name) if routes else ""
    mutation_test = mutation_test_template.format(module_name=module_name) if mutation_routes else ""
    
    new_content = template.format(
        module_name=module_name,
        routes=routes,
        mutation_routes=mutation_routes,
        read_test=read_test,
        mutation_test=mutation_test
    )
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print(f"Refactored {filepath}")
