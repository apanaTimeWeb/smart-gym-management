// RESPONSIBILITY: Validates partial updates at the profile HTTP boundary.
// FLOW: HTTP JSON -> ProfileUpdateDto -> Profile service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum ProfileRole { SUPERADMIN = 'SUPERADMIN', }
export class ProfileUpdateDto {
  @IsOptional()
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email!: string;
  @IsOptional()
  @IsEnum(ProfileRole)
  role!: ProfileRole;
  @IsOptional()
  @IsString()
  phone!: string;
  @IsOptional()
  @IsString()
  timezone!: string;
  @IsOptional()
  @IsString()
  language!: string;
  @IsOptional()
  @IsString()
  avatarUrl!: string;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastLoginAt!: Date;
  @IsOptional()
  @IsBoolean()
  twoFactorEnabled!: boolean;
  @IsOptional()
  @IsString()
  passwordHash!: string;
}
