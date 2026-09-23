// RESPONSIBILITY: Validates standard Gym creation payloads for already-provisioned tenants without accepting server-managed fields.
// FLOW: HTTP POST /superadmin/gyms -> SuperadminGymsCreateDto -> creation service.
import { IsEmail, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class SuperadminGymsCreateDto {
  @IsString() @Length(2, 120) name!: string;
  @IsString() @Length(2, 120) ownerName!: string;
  @IsEmail() adminEmail!: string;
  @IsString() @Length(7, 20) phone!: string;
  @IsString() plan!: string;
  @IsOptional() @IsString() @Length(1, 128) acquisitionSource?: string;
  @IsOptional() @IsInt() @Min(0) acquisitionCostMinor?: number;
  @IsOptional() @IsInt() @Min(0) taxRateBasisPoints?: number;
}