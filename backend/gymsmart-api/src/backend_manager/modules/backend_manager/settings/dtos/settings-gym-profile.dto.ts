// RESPONSIBILITY: Validates Manager gym profile update fields.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsEmail, IsOptional, IsString, IsUrl, Matches } from 'class-validator';

export class SettingsGymProfileDto {
  @IsString()
  gymName!: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  @Matches(/^\d{6}$/)
  pincode!: string;

  @IsString()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  gstin?: string;
}
