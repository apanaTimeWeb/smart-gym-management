// RESPONSIBILITY: Validates Admin login input at the API boundary.
// FLOW: POST /auth/login → CoreAuthLoginDto → CoreAuthService.

import { IsEmail, IsString, MinLength } from 'class-validator';

export class CoreAuthLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
