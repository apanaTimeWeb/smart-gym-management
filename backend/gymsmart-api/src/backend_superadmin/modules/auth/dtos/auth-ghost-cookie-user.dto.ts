// RESPONSIBILITY: Validates the non-authoritative user metadata embedded in a signed ghost-login handoff.
// FLOW: AuthGhostCookieDto -> nested user metadata -> DTO validation.
import { IsEmail, IsString } from 'class-validator';

export class AuthGhostCookieUserDto {
  @IsString() role!: string;
  @IsEmail() email!: string;
  @IsString() name!: string;
  @IsString() tenantId!: string;
  @IsString() id!: string;
}