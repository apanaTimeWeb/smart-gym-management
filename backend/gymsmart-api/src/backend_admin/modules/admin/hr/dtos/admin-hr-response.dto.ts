// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin hr.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Hr response mapper → ApiResponse<T>.

export class AdminHrStaffDto {
  @ApiProperty() id!: string;
  @ApiPropertyOptional() employeeId?: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() role!: string;
  @ApiProperty() salary!: number;
  @ApiProperty() branch!: string;
  @ApiProperty() gender!: string;
  @ApiPropertyOptional() address?: string;
  @ApiPropertyOptional() aadhaar?: string;
  @ApiPropertyOptional() upiId?: string;
  @ApiPropertyOptional() bankAccountNumber?: string;
  @ApiPropertyOptional() advanceSalary?: number;
  @ApiProperty() joinDate!: string;
  @ApiPropertyOptional() joiningDate?: string;
  @ApiProperty() isActive!: boolean;
  @ApiPropertyOptional() salaryType?: string;
  @ApiPropertyOptional() paymentCycle?: string;
  @ApiPropertyOptional() currentDue?: number;
  @ApiPropertyOptional({ type: [String] }) assignedBranches?: string[];
  @ApiPropertyOptional() primaryBranchId?: string;
  @ApiPropertyOptional() emergencyContactName?: string;
  @ApiPropertyOptional() emergencyContactPhone?: string;
  @ApiPropertyOptional() department?: string;
  @ApiPropertyOptional({ type: [String] }) certifications?: string[];
  @ApiPropertyOptional() contractType?: string;
  @ApiPropertyOptional() terminationDate?: string;
}

export class AdminHrStaffListResponseDto {
  @ApiProperty({ type: [AdminHrStaffDto] }) staff!: AdminHrStaffDto[];
  @ApiProperty() total!: number;
}

export class AdminHrStaffRoleDto {
  @ApiProperty() name!: string;
  @ApiProperty() role!: string;
}

export class AdminHrPayrollDto {
  @ApiProperty() id!: string;
  @ApiProperty() staffId!: string;
  @ApiProperty() month!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() paidAmount!: number;
  @ApiProperty() pendingAmount!: number;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() paidAt?: string;
  @ApiPropertyOptional() notes?: string;
  @ApiPropertyOptional({ type: AdminHrStaffRoleDto }) staff?: AdminHrStaffRoleDto;
}

export class AdminHrPayrollListResponseDto {
  @ApiProperty({ type: [AdminHrPayrollDto] }) payrolls!: AdminHrPayrollDto[];
  @ApiProperty() total!: number;
}

export class AdminHrSummaryDto {
  @ApiProperty() totalSalaryThisMonth!: number;
  @ApiProperty() totalSalaryPaid!: number;
  @ApiProperty() totalSalaryDue!: number;
  @ApiProperty() totalAdvanceGiven!: number;
  @ApiProperty() pendingPaymentsCount!: number;
  @ApiProperty() totalStaff!: number;
  @ApiProperty() activeStaff!: number;
  @ApiProperty() totalPayrollThisMonth!: number;
  @ApiProperty() paidCount!: number;
  @ApiProperty() pendingCount!: number;
}

export class AdminHrLedgerEntryDto {
  @ApiProperty() id!: string;
  @ApiProperty() staffId!: string;
  @ApiProperty() date!: string;
  @ApiProperty() type!: string;
  @ApiProperty() credit!: number;
  @ApiProperty() debit!: number;
  @ApiProperty() balance!: number;
  @ApiPropertyOptional() notes?: string;
  @ApiPropertyOptional() referenceNo?: string;
  @ApiPropertyOptional() paymentMode?: string;
  @ApiPropertyOptional() openingBalance?: number;
}

export class AdminHrStaffPerformanceRecordDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() role!: string;
  @ApiProperty() branchName!: string;
  @ApiProperty() sessionsTaken!: number;
  @ApiProperty() membersAdded!: number;
  @ApiProperty() attendancePct!: number;
  @ApiProperty() rating!: number;
  @ApiProperty({ enum: ['EXCELLENT', 'AVERAGE', 'POOR'] }) status!: string;
}
