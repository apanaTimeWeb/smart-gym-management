// RESPONSIBILITY: Validates SuperadminProfilePasswordChangeDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsString } from 'class-validator';

export class SuperadminProfilePasswordChangeDto {
  @IsString()
  currentPassword!: string;
  @IsString()
  newPassword!: string;
  @IsString()
  confirmPassword!: string;
}