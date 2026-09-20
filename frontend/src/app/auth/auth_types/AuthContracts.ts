/**
 * RESPONSIBILITY: Defines Auth domain contracts shared by server routes, the login client, and the mock layer.
 * DATA FLOW: Request/response payloads are validated at the Auth API boundary before business/UI code consumes them.
 */
import { z } from 'zod';
import { AuthRoleConstants } from '@/app/auth/auth_constants/AuthRoleConstants';
import type { AuthRole } from '@/app/auth/auth_constants/AuthRoleConstants';

export const AuthUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum([
    AuthRoleConstants.SUPERADMIN,
    AuthRoleConstants.ADMIN,
    AuthRoleConstants.MANAGER,
    AuthRoleConstants.TRAINER,
  ]).transform((role): AuthRole => role),
  tenantId: z.string().min(1).optional(),
});

export const AuthLoginCredentialsSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const AuthBackendLoginDataSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  user: AuthUserSchema,
});

export const AuthBackendRefreshDataSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1).optional(),
});

const AuthApiEnvelopeShape = {
  success: z.boolean(),
  message: z.string(),
  data: z.unknown().nullable(),
  error: z.string().optional(),
  errorCode: z.string().optional(),
  statusCode: z.number().optional(),
  validationErrors: z.array(z.object({
    field: z.string(),
    message: z.string(),
  })).optional(),
};

export const AuthBackendLoginResponseSchema = z.object({
  ...AuthApiEnvelopeShape,
  data: AuthBackendLoginDataSchema.nullable(),
});

export const AuthBackendUserResponseSchema = z.object({
  ...AuthApiEnvelopeShape,
  data: AuthUserSchema.nullable(),
});

export const AuthBackendRefreshResponseSchema = z.object({
  ...AuthApiEnvelopeShape,
  data: AuthBackendRefreshDataSchema.nullable(),
});

export const AuthSessionResponseSchema = z.object({
  ...AuthApiEnvelopeShape,
  data: AuthUserSchema.nullable(),
});

export const AuthSessionUserCookieSchema = AuthUserSchema;
export const AuthTokenStatusSchema = z.object({
  authenticated: z.boolean(),
  user: AuthUserSchema.nullable(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
export type AuthLoginCredentials = z.infer<typeof AuthLoginCredentialsSchema>;
export type AuthBackendLoginData = z.infer<typeof AuthBackendLoginDataSchema>;
export type AuthBackendRefreshData = z.infer<typeof AuthBackendRefreshDataSchema>;
export type AuthSessionUserCookie = z.infer<typeof AuthSessionUserCookieSchema>;
export type AuthTokenStatus = z.infer<typeof AuthTokenStatusSchema>;
