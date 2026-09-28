// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';
import { HrGender, HrStaffRole, PaymentCycle, SalaryType } from '@/backend_manager/manager_modules/hr/manager-hr.constants';

export class ManagerHrUpdateStaffHrStaffEmergencyContactDto extends CoreRequestDto {
  @IsString() name!: string;
  @IsString() phone!: string;
  @IsString() relation!: string;
}

export { ManagerHrUpdateStaffHrStaffEmergencyContactDto as HrUpdateStaffHrStaffEmergencyContactDto };
