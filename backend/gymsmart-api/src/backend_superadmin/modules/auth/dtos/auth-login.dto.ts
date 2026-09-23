// RESPONSIBILITY: Validates Superadmin login credentials at the authentication boundary.
// FLOW: POST /auth/login -> DTO -> AuthService -> token pair.
import { IsEmail, IsString, MinLength } from 'class-validator';
export class AuthLoginDto { @IsEmail() email!: string; @IsString() @MinLength(12) password!: string; }