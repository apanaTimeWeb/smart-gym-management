// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

export class HrGeneratePayrollsResponseDto {
  @ApiProperty({ type: [Object] })
  payrolls!: CoreJsonObject[];

}
