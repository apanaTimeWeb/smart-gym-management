// RESPONSIBILITY: Validates Superadmin login credentials at the authentication boundary.
// FLOW: POST /auth/login -> DTO -> SuperadminAuthService -> token pair.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminAuthLoginDto as the class-level contract for superadmin-auth-login.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAuthLoginDto {@ApiProperty()
 @IsEmail() email!: string;@ApiProperty()
 @IsString() @MinLength(12) password!: string; }
