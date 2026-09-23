// RESPONSIBILITY: Validates the client-owned Gym provisioning request without accepting server-managed persistence fields.
// FLOW: HTTP POST /api/gyms/provision -> SuperadminGymsProvisionDto -> provisioning service.
import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { GymsStatus } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-update.dto';

export class SuperadminGymsProvisionDto {
  @IsString() @Length(2, 120) gymName!: string;
  @IsString() @Length(2, 120) ownerName!: string;
  @IsEmail() adminEmail!: string;
  @IsString() @Length(7, 20) phone!: string;
  @IsOptional()
  @IsString()
  @Matches(/^(?:\d{12})?$/)
  aadharNumber?: string;
  @IsString() @Length(8, 128) temporaryPassword!: string;
  @IsString() plan!: string;
  @IsOptional() @IsString() @Length(1, 128) planId?: string;
  @IsOptional() @IsEnum(GymsStatus) initialStatus?: GymsStatus;
}