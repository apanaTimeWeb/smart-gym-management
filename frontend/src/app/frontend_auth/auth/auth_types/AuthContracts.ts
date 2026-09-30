/**
 * RESPONSIBILITY: Defines Auth request/response contracts consumed by Auth routes, API clients, and module-owned mocks.
 * DATA FLOW: Unknown request/response payload -> Zod boundary validation -> typed Auth contract.
 */
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';
import type { ApiResponse } from '@/lib/api';

export const AuthRoleSchema = z.enum([
  AuthRoleConstants.SUPERADMIN,
  AuthRoleConstants.ADMIN,
  AuthRoleConstants.MANAGER,
  AuthRoleConstants.TRAINER,
]);

export const AuthUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  role: AuthRoleSchema,
  tenantId: z.string().min(1).optional(),
});

export const AuthLoginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const AuthDemoLoginRequestSchema = z.object({
  role: AuthRoleSchema,
});

export const AuthValidationErrorItemSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const AuthPaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

const AuthApiEnvelopeShape = {
  success: z.boolean(),
  message: z.string(),
  data: z.unknown().nullable(),
  meta: AuthPaginationMetaSchema.optional(),
  error: z.string().optional(),
  errorCode: z.string().optional(),
  statusCode: z.number().int().optional(),
  validationErrors: z.array(AuthValidationErrorItemSchema).optional(),
};

function applyCanonicalAuthEnvelopeRules<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.superRefine((val, context) => {
    const value = val as Record<string, any>;
    if (value.success && value.statusCode !== undefined) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['statusCode'], message: 'Success responses must omit statusCode.' });
    }

    if (!value.success && value.statusCode === undefined) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['statusCode'], message: 'Error responses must include statusCode.' });
    }

    if (value.validationErrors && value.statusCode !== StatusCodes.BAD_REQUEST) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['validationErrors'], message: `validationErrors are only valid on ${StatusCodes.BAD_REQUEST} responses.` });
    }
  });
}

export const AuthBackendLoginDataSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  user: AuthUserSchema,
});

export const AuthBackendRefreshDataSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1).optional(),
});


function applyNonPaginatedAuthEnvelopeRules<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return applyCanonicalAuthEnvelopeRules(schema).superRefine((val, context) => {
    const value = val as Record<string, any>;
    if (value.meta !== undefined) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['meta'], message: 'meta is reserved for paginated list responses.' });
    }
  });
}

export const AuthBackendLogoutResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: z.null(),
}));

export const AuthBackendLoginResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: AuthBackendLoginDataSchema.nullable(),
}));

export const AuthBackendUserResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: AuthUserSchema.nullable(),
}));

export const AuthBackendRefreshResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: AuthBackendRefreshDataSchema.nullable(),
}));

export const AuthSessionResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: AuthUserSchema.nullable(),
}));

export const AuthSessionUserCookieSchema = AuthUserSchema;
export const AuthTokenStatusSchema = z.object({
  authenticated: z.boolean(),
  user: AuthUserSchema.nullable(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
export type AuthRole = z.infer<typeof AuthRoleSchema>;
export type AuthLoginCredentials = z.infer<typeof AuthLoginCredentialsSchema>;
export type AuthDemoLoginRequest = z.infer<typeof AuthDemoLoginRequestSchema>;
export type AuthBackendLoginData = z.infer<typeof AuthBackendLoginDataSchema>;
export type AuthBackendRefreshData = z.infer<typeof AuthBackendRefreshDataSchema>;
export type AuthSessionUserCookie = z.infer<typeof AuthSessionUserCookieSchema>;
export type AuthTokenStatus = z.infer<typeof AuthTokenStatusSchema>;
export type AuthValidationErrorItem = z.infer<typeof AuthValidationErrorItemSchema>;
export type AuthPaginationMeta = z.infer<typeof AuthPaginationMetaSchema>;

export type AuthSessionApiResponse = ApiResponse<AuthUser | null>;
export type AuthBackendLoginApiResponse = ApiResponse<AuthBackendLoginData | null>;
export type AuthBackendRefreshApiResponse = ApiResponse<AuthBackendRefreshData | null>;
export type AuthBackendUserApiResponse = ApiResponse<AuthUser | null>;
export type AuthBackendLogoutApiResponse = ApiResponse<null>;
