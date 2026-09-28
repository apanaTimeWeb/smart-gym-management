// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerFinancePaymentPlanResponseDto { @ApiProperty() name!: string; }
export class ManagerFinancePaymentMemberResponseDto { @ApiProperty() name!: string; @ApiProperty() email!: string; @ApiProperty() phone!: string; @ApiPropertyOptional({type:ManagerFinancePaymentPlanResponseDto}) plan?: ManagerFinancePaymentPlanResponseDto; }
export { ManagerFinancePaymentMemberResponseDto as FinancePaymentMemberResponseDto };
