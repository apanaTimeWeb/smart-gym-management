# RESPONSIBILITY: Proves the live Auth HTTP contract, canonical envelopes, validation rejection and refresh-token replay behavior.
# FLOW: pytest -> HTTP API -> Auth endpoints -> observable HTTP response and persisted session effects.

import os
import uuid
from http import HTTPStatus

import pytest
import requests


BASE_URL = os.getenv('E2E_BASE_URL', 'http://localhost:3000/api/v1')
EMAIL = os.getenv('E2E_SUPERADMIN_EMAIL', 'superadmin@gymsmart.local')
PASSWORD = os.getenv('E2E_SUPERADMIN_PASSWORD')


@pytest.mark.skipif(not PASSWORD, reason='Set E2E_SUPERADMIN_PASSWORD after running the deterministic seed.')
def test_auth_full_lifecycle() -> None:
    session = requests.Session()
    login = session.post(
        f'{BASE_URL}/auth/login',
        json={'email': EMAIL, 'password': PASSWORD},
        timeout=5,
    )
    assert login.status_code == HTTPStatus.OK
    login_body = login.json()
    assert login_body['success'] is True
    assert login_body['data']['accessToken']
    assert login_body['data']['refreshToken']
    assert {'id', 'name', 'email', 'role'} <= set(login_body['data']['user'])

    access_token = login_body['data']['accessToken']
    refresh_token = login_body['data']['refreshToken']

    me = session.get(
        f'{BASE_URL}/auth/me',
        headers={'Authorization': f'Bearer {access_token}'},
        timeout=5,
    )
    assert me.status_code == HTTPStatus.OK
    assert me.json()['data']['email'] == EMAIL

    refreshed = session.post(
        f'{BASE_URL}/auth/refresh',
        headers={'Authorization': f'Bearer {refresh_token}'},
        timeout=5,
    )
    assert refreshed.status_code == HTTPStatus.OK
    refresh_body = refreshed.json()
    assert refresh_body['success'] is True
    next_refresh_token = refresh_body['data']['refreshToken']
    assert next_refresh_token != refresh_token

    replay = session.post(
        f'{BASE_URL}/auth/refresh',
        headers={'Authorization': f'Bearer {refresh_token}'},
        timeout=5,
    )
    assert replay.status_code == HTTPStatus.UNAUTHORIZED
    replay_body = replay.json()
    assert replay_body['success'] is False
    assert replay_body['data'] is None
    assert replay_body['errorCode'] == 'AUTH.REFRESH.REUSE_DETECTED'

    logout = session.post(
        f'{BASE_URL}/auth/logout',
        headers={'Authorization': f'Bearer {access_token}'},
        timeout=5,
    )
    assert logout.status_code == HTTPStatus.OK
    assert logout.json()['data'] is None


@pytest.mark.skipif(not PASSWORD, reason='Set E2E_SUPERADMIN_PASSWORD after running the deterministic seed.')
def test_login_rejects_unknown_payload_property() -> None:
    response = requests.post(
        f'{BASE_URL}/auth/login',
        json={'email': EMAIL, 'password': PASSWORD, 'role': 'SUPERADMIN', 'requestId': str(uuid.uuid4())},
        timeout=5,
    )
    assert response.status_code == HTTPStatus.BAD_REQUEST
    body = response.json()
    assert body['success'] is False
    assert body['data'] is None
    assert body['errorCode'] == 'VALIDATION.DTO.FAILED'
    assert body['validationErrors']
