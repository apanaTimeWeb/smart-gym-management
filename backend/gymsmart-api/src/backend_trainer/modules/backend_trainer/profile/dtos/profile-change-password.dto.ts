// RESPONSIBILITY: Validates the authenticated Trainer password-change payload only.
// FLOW: HTTP body → ProfileChangePasswordDto → ProfileTrainerPasswordChangeService.

import { IsString, MinLength } from 'class-validator';

export class ProfileChangePasswordDto {
  @IsString() @MinLength(8) currentPassword!: string;
  @IsString() @MinLength(8) newPassword!: string;
  @IsString() @MinLength(8) confirmPassword!: string;
}
