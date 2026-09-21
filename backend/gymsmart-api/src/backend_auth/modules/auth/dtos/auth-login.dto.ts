// RESPONSIBILITY: Validates the exact frontend-frozen Auth login request contract.
// FLOW: HTTP POST /auth/login -> AuthLoginDto -> AuthLoginService.

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class AuthLoginDto {
  @ApiProperty({ example: 'admin@gymsmart.com', description: 'Email address.' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'demo123', minLength: 6, description: 'Password, minimum 6 characters.' })
  @IsString()
  @MinLength(6)
  password!: string;
}
