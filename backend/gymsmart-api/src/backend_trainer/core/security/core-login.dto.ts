// RESPONSIBILITY: Validates the public login request shape at the authentication boundary.
// FLOW: HTTP body → CoreLoginDto → CoreAuthService.

import { IsEmail, IsString, MinLength } from 'class-validator';

export class CoreLoginDto { @IsEmail() email!:string; @IsString() @MinLength(8) password!:string; }
