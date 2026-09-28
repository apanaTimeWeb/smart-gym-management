// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HrPayrollStaffResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-payroll-staff.response.dto';

export class ManagerHrPayrollItemResponseDto {
  @ApiProperty()
  month!: string;
  @ApiProperty({ type: Number })
  netPayable!: number;
  @ApiProperty({ type: Number })
  paidAmount!: number;
  @ApiProperty({ type: Number })
  pendingAmount!: number;
  @ApiProperty()
  currency!: string;
  @ApiPropertyOptional({ type: HrPayrollStaffResponseDto })
  staff?: HrPayrollStaffResponseDto;
  @ApiProperty()
  status!: string;
}

export { ManagerHrPayrollItemResponseDto as HrPayrollItemResponseDto };
