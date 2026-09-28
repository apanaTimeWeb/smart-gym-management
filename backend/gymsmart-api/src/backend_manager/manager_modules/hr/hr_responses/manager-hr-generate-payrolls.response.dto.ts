// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty } from '@nestjs/swagger';
import { HrGeneratePayrollsItemResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-generate-payrolls-item.response.dto';
export class ManagerHrGeneratePayrollsResponseDto { @ApiProperty({type:[HrGeneratePayrollsItemResponseDto]}) payrolls!: HrGeneratePayrollsItemResponseDto[]; }
export { ManagerHrGeneratePayrollsResponseDto as HrGeneratePayrollsResponseDto };
