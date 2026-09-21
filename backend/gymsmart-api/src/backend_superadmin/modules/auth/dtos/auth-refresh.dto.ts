// RESPONSIBILITY: Validates optional refresh token payloads when cookie transport is unavailable.
// FLOW: POST /auth/refresh -> cookie/body token -> AuthService.
import { IsOptional, IsString } from 'class-validator';
export class AuthRefreshDto { @IsOptional() @IsString() refreshToken?: string; }
