// RESPONSIBILITY: Validates the client-owned Gym provisioning request without accepting server-managed persistence fields.
// FLOW: HTTP POST /api/gyms/provision -> GymsProvisionDto -> provisioning service.
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { GymsStatus } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-create.dto';

export class GymsProvisionDto {
  @IsString() @Length(2, 120) gymName!: string;
  @IsString() @Length(2, 120) ownerName!: string;
  @IsEmail() adminEmail!: string;
  @IsString() @Length(7, 20) phone!: string;
  @IsString() @Length(12, 12) aadharNumber!: string;
  @IsString() @Length(12, 128) temporaryPassword!: string;
  @IsString() plan!: string;
  @IsOptional() @IsEnum(GymsStatus) initialStatus?: GymsStatus;
}
