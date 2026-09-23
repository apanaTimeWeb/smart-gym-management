// RESPONSIBILITY: Validates optional refresh token payloads when cookie transport is unavailable.
// FLOW: POST /auth/refresh -> cookie/body token -> SuperadminAuthService.
import { IsOptional, IsString } from 'class-validator';
export class SuperadminAuthRefreshDto { @IsOptional() @IsString() refreshToken?: string; }