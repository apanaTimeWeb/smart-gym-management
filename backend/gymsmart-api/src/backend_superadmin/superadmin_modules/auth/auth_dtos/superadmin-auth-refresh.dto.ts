// RESPONSIBILITY: Validates optional refresh token payloads when cookie transport is unavailable.
// FLOW: POST /auth/refresh -> cookie/body token -> SuperadminAuthService.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminAuthRefreshDto as the class-level contract for superadmin-auth-refresh.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAuthRefreshDto {@ApiPropertyOptional()
 @IsOptional() @IsString() refreshToken?: string; }
