import { describe, expect, it, vi } from 'vitest';

import { AuthClientRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthClientRuntimeConfig';



const authTestEnv = vi.hoisted(() => ({
  NODE_ENV: 'test' as 'development' | 'test' | 'production',
  NEXT_PUBLIC_AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  NEXT_PUBLIC_API_URL: 'http://localhost:4000',
}));

vi.mock('@/config/env', () => ({ env: authTestEnv }));

describe('AuthClientRuntimeConfig', () => {
  it('enables demo presentation only for non-production runtime with the explicit public gate', () => {
    authTestEnv.NODE_ENV = 'test';
    authTestEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'true';
    expect(AuthClientRuntimeConfig.isLoginDemoEnabled()).toBe(true);
  });

  it('disables demo presentation in production even when the public flag is true', () => {
    authTestEnv.NODE_ENV = 'production';
    authTestEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'true';
    expect(AuthClientRuntimeConfig.isLoginDemoEnabled()).toBe(false);
  });
});
