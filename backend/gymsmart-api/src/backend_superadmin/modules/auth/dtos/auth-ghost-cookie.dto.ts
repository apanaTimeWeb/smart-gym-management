// RESPONSIBILITY: Validates the signed impersonation handoff used to create the HttpOnly ghost-login cookie.
// FLOW: POST /auth/set-cookie -> AuthGhostCookieDto validation -> signed token verification -> cookie.
import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
import { AuthGhostCookieUserDto } from '@/backend_superadmin/modules/auth/dtos/auth-ghost-cookie-user.dto';

export class AuthGhostCookieDto {
  @IsString()
  @MinLength(20)
  token!: string;

  @IsString()
  @MinLength(20)
  refreshToken!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AuthGhostCookieUserDto)
  user!: AuthGhostCookieUserDto;
}