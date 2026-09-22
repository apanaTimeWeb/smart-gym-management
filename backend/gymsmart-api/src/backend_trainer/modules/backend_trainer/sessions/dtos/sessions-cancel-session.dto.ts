// RESPONSIBILITY: Validates the optional cancellation reason for a trainer-owned session.
// FLOW: HTTP body → SessionsCancelSessionDto → SessionsCommandService.

import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SessionsCancelSessionDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(500) reason?: string;
}
