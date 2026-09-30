import { describe, expect, it, vi } from 'vitest';
import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';

const authTestEnv = vi.hoisted(() => ({
  NODE_ENV: 'test' as 'development' | 'test' | 'production',
  NEXT_PUBLIC_AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  NEXT_PUBLIC_API_URL: 'http://localhost:4000',
}));

vi.mock('@/config/env', () => ({ env: authTestEnv }));

describe('AuthServerRuntimeConfig', () => {
  it('requires non-production runtime and the private server gate for demo sessions', () => {
    authTestEnv.NODE_ENV = 'test';
    authTestEnv.AUTH_DEMO_MODE = 'true';
    expect(AuthServerRuntimeConfig.isLoginDemoEnabled()).toBe(true);
  });

  it('always disables demo sessions in production', () => {
    authTestEnv.NODE_ENV = 'production';
    authTestEnv.AUTH_DEMO_MODE = 'true';
    expect(AuthServerRuntimeConfig.isLoginDemoEnabled()).toBe(false);
  });
});
