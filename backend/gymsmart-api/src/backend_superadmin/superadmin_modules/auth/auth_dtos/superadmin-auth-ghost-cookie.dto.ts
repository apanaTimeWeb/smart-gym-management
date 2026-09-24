import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates the signed impersonation handoff used to create the HttpOnly ghost-login cookie.
// FLOW: POST /auth/set-cookie -> SuperadminAuthGhostCookieDto validation -> signed token verification -> cookie.
import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
import { SuperadminAuthGhostCookieUserDto } from '@/backend_superadmin/superadmin_modules/auth/auth_dtos/superadmin-auth-ghost-cookie-user.dto';

/**
 * Primary Intent: Defines SuperadminAuthGhostCookieDto as the class-level contract for superadmin-auth-ghost-cookie.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAuthGhostCookieDto {
  @IsString()
  @MinLength(20)
  @ApiProperty()
  /** Primary Intent: Defines the `token` data contract for this superadmin-auth-ghost-cookie.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  token!: string;

  @IsString()
  @MinLength(20)
  @ApiProperty()
  /** Primary Intent: Defines the `refreshToken` data contract for this superadmin-auth-ghost-cookie.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  refreshToken!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => SuperadminAuthGhostCookieUserDto)
  @ApiProperty()
  /** Primary Intent: Defines the `user` data contract for this superadmin-auth-ghost-cookie.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  user!: SuperadminAuthGhostCookieUserDto;
}
