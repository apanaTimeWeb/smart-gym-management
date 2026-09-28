// RESPONSIBILITY: Defines a typed nested response object for the owning Manager feature.
// FLOW: Domain projection -> nested typed response -> parent response DTO.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerFinancePaymentPlanResponseDto {
  @ApiProperty()
  name!: string;
}

export { ManagerFinancePaymentPlanResponseDto as FinancePaymentPlanResponseDto };
