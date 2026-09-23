// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class HrGiveStaffAdvanceRequestDto extends CoreRequestDto {
  @IsString()
  staffId!: string;

  @IsNumber()
  @Type(() => Number)
  amount!: number;

  @IsString()
  paymentMode!: string;

  @IsOptional()
  @IsString()
  notes!: string;
}
