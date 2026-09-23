// RESPONSIBILITY: Validates the signed impersonation handoff used to create the HttpOnly ghost-login cookie.
// FLOW: POST /auth/set-cookie -> SuperadminAuthGhostCookieDto validation -> signed token verification -> cookie.
import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
import { SuperadminAuthGhostCookieUserDto } from '@/backend_superadmin/superadmin_modules/auth/dtos/superadmin-auth-ghost-cookie-user.dto';

export class SuperadminAuthGhostCookieDto {
  @IsString()
  @MinLength(20)
  token!: string;

  @IsString()
  @MinLength(20)
  refreshToken!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => SuperadminAuthGhostCookieUserDto)
  user!: SuperadminAuthGhostCookieUserDto;
}