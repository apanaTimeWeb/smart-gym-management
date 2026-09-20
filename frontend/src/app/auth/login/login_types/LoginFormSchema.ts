/**
 * RESPONSIBILITY: Owns the Login credential validation schema used by the Login form and API submission flow.
 * DATA FLOW: Login input -> LoginFormSchema -> React Hook Form -> AuthApi.login.
 */
import { AuthLoginCredentialsSchema } from '@/app/auth/auth_types/AuthContracts';

export const LoginSchema = AuthLoginCredentialsSchema;
