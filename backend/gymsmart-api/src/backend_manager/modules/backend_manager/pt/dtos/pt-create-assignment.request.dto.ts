// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class PtCreateAssignmentRequestDto extends CoreRequestDto {
  @IsString()
  memberId!: string;

  @IsString()
  trainerId!: string;

  @IsString()
  packageId!: string;

  @IsISO8601()
  startDate!: string;

}
