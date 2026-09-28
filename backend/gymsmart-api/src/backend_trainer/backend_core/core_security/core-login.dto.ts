// RESPONSIBILITY: Validates the public login request shape at the authentication boundary.
// FLOW: HTTP body → CoreLoginDto → CoreAuthService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';


/**
 * Intent: Defines the CoreLoginDto boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreLoginDto {@ApiProperty({ type: String })
 @IsEmail() email!:string;@ApiProperty({ type: String })
 @IsString() @MinLength(8) password!:string; }
