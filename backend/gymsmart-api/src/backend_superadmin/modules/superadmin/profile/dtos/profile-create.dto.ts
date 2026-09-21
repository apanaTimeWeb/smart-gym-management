// RESPONSIBILITY: Validates creation payloads at the profile HTTP boundary.
// FLOW: HTTP JSON -> ProfileCreateDto -> Profile service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum ProfileRole { SUPERADMIN = 'SUPERADMIN', }
export class ProfileCreateDto {
  @IsString()
  name!: string;
  @IsString()
  @IsEmail()
  email!: string;
  @IsEnum(ProfileRole)
  role!: ProfileRole;
  @IsString()
  phone!: string;
  @IsString()
  timezone!: string;
  @IsString()
  language!: string;
  @IsString()
  avatarUrl!: string;
  @Type(() => Date)
  @IsDate()
  lastLoginAt!: Date;
  @IsBoolean()
  twoFactorEnabled!: boolean;
  @IsString()
  passwordHash!: string;
}
