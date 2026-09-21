import type { Config } from 'jest';
const config: Config = { preset: 'ts-jest', testEnvironment: 'node', moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }, roots: ['<rootDir>/src'], testMatch: ['**/*.spec.ts'], clearMocks: true };
export default config;
