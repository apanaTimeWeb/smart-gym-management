// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HrPayrollStaffResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-payroll-staff.response.dto';
export class ManagerHrPayrollItemResponseDto {
  @ApiProperty() id!: string; @ApiProperty() staffId!: string; @ApiProperty() month!: string; @ApiProperty({type:Number}) amount!: number;
  @ApiProperty({type:Number}) netPayable!: number; @ApiProperty({type:Number}) paidAmount!: number; @ApiProperty({type:Number}) pendingAmount!: number;
  @ApiProperty() status!: string; @ApiPropertyOptional() paidAt?: string; @ApiPropertyOptional() notes?: string;
  @ApiProperty({ type: Object }) deductions!: { tds:number; pf:number; esi:number; other:number };
  @ApiPropertyOptional({type:HrPayrollStaffResponseDto}) staff?: HrPayrollStaffResponseDto;
}
export { ManagerHrPayrollItemResponseDto as HrPayrollItemResponseDto };
