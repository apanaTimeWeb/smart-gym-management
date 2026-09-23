// RESPONSIBILITY: Validates partial updates at the gyms HTTP boundary.
// FLOW: HTTP JSON -> GymsUpdateDto -> Gyms service.
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export enum GymsStatus { ACTIVE = 'ACTIVE', SUSPENDED = 'SUSPENDED', TRIAL = 'TRIAL', CANCELLED = 'CANCELLED', }
export class GymsUpdateDto {
  @IsOptional() @IsString() @Length(1, 120) name?: string;
  @IsOptional() @IsString() @Length(1, 120) ownerName?: string;
  @IsOptional() @IsEmail() adminEmail?: string;
  @IsOptional() @IsString() @Length(10, 20) phone?: string;
  @IsOptional() @IsEnum(GymsStatus) status?: GymsStatus;
  @IsOptional() @IsString() @Length(1, 128) plan?: string;
  @IsOptional() @IsString() @Length(8, 128) temporaryPassword?: string;
  @IsOptional() @IsString() @Length(1, 128) acquisitionSource?: string;
  @IsOptional() @IsInt() @Min(0) acquisitionCostMinor?: number;
  @IsOptional() @IsInt() @Min(0) taxRateBasisPoints?: number;
}