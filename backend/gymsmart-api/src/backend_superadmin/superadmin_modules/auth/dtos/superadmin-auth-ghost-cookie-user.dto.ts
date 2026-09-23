// RESPONSIBILITY: Validates the non-authoritative user metadata embedded in a signed ghost-login handoff.
// FLOW: SuperadminAuthGhostCookieDto -> nested user metadata -> DTO validation.
import { IsEmail, IsString } from 'class-validator';

export class SuperadminAuthGhostCookieUserDto {
  @IsString() role!: string;
  @IsEmail() email!: string;
  @IsString() name!: string;
  @IsString() tenantId!: string;
  @IsString() id!: string;
}