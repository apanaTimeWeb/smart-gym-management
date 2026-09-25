// RESPONSIBILITY: Validates the non-authoritative user metadata embedded in a signed ghost-login handoff.
// FLOW: SuperadminAuthGhostCookieDto -> nested user metadata -> DTO validation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminAuthGhostCookieUserDto as the class-level contract for superadmin-auth-ghost-cookie-user.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAuthGhostCookieUserDto {@ApiProperty()

  @IsString() role!: string;@ApiProperty()

  @IsEmail() email!: string;@ApiProperty()

  @IsString() name!: string;@ApiProperty()

  @IsString() tenantId!: string;@ApiProperty()

  @IsString() id!: string;
}
