// RESPONSIBILITY: Validates SuperadminProfileTwoFactorDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsBoolean, IsString } from 'class-validator';

export class SuperadminProfileTwoFactorDto {
  @IsBoolean()
  enabled!: boolean;
  @IsString()
  password!: string;
}