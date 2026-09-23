// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { HrPayrollStatus } from '@/backend_manager/modules/backend_manager/hr/hr.constants';

export class HrUpdatePayrollStatusRequestDto extends CoreRequestDto {
  @IsEnum(HrPayrollStatus)
  status!: HrPayrollStatus;

}
