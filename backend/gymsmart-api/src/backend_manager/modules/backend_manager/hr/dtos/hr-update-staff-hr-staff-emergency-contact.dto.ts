// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { HrGender, HrStaffRole, PaymentCycle, SalaryType } from '@/backend_manager/modules/backend_manager/hr/hr.constants';

export class HrUpdateStaffHrStaffEmergencyContactDto {
  @IsString() name!: string;
  @IsString() phone!: string;
  @IsString() relation!: string;
}
