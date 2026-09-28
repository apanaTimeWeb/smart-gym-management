// RESPONSIBILITY: Owns the Manager hr request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

import { HrPaymentMode } from '@/backend_manager/manager_modules/hr/manager-hr.constants';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerHrPayStaffDueRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString()
  @ApiProperty()
  staffId!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  amount!: number;

  @IsEnum(HrPaymentMode)
  @ApiProperty()
  paymentMode!: HrPaymentMode;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  notes!: string;
}

export { ManagerHrPayStaffDueRequestDto as HrPayStaffDueRequestDto };
