// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin branches.
// FLOW: Repository domain â†’ Branches response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminBranchesStatus } from '@/backend_admin/admin_modules/admin_branches/admin-branches.constants.js';

/**
 * @description Defines the AdminBranchExpenseItemDto boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchExpenseItemDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  label!: string;
  @ApiProperty()
  amount!: number;
  @ApiProperty()
  category!: string;
  @ApiProperty()
  date!: string;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminBranchRevenueItemDto boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchRevenueItemDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  label!: string;
  @ApiProperty()
  amount!: number;
  @ApiProperty()
  method!: string;
  @ApiProperty()
  date!: string;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminBranchStaffMemberDto boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchStaffMemberDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  role!: string;
  @ApiProperty()
  shift!: string;
  @ApiProperty({ enum: ['active', 'on-leave'] })
  status!: AdminBranchesStatus;
}

/**
 * @description Defines the AdminBranchStudentDto boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchStudentDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  plan!: string;
  @ApiProperty({ enum: ['active', 'expired'] })
  status!: AdminBranchesStatus;
  @ApiProperty()
  joinDate!: string;
}

/**
 * @description Defines the AdminBranchDto boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiPropertyOptional()
  branchCode?: string;
  @ApiPropertyOptional()
  gstNumber?: string;
  @ApiPropertyOptional()
  address?: string;
  @ApiProperty()
  location!: string;
  @ApiPropertyOptional()
  contactPhone?: string;
  @ApiPropertyOptional()
  contactEmail?: string;
  @ApiPropertyOptional()
  openingTime?: string;
  @ApiPropertyOptional()
  closingTime?: string;
  @ApiPropertyOptional()
  maxCapacity?: number;
  @ApiPropertyOptional()
  currentOccupancy?: number;
  @ApiPropertyOptional()
  equipmentCount?: number;
  @ApiProperty({ enum: ['active', 'inactive'] })
  status!: AdminBranchesStatus;
  @ApiProperty()
  revenue!: number;
  @ApiProperty()
  expenses!: number;
  @ApiProperty()
  studentsCount!: number;
  @ApiProperty()
  staffCount!: number;
  @ApiPropertyOptional({ type: [AdminBranchExpenseItemDto] })
  expenseItems?: AdminBranchExpenseItemDto[];
  @ApiPropertyOptional({ type: [AdminBranchRevenueItemDto] })
  revenueItems?: AdminBranchRevenueItemDto[];
  @ApiPropertyOptional({ type: [AdminBranchStaffMemberDto] })
  staffList?: AdminBranchStaffMemberDto[];
  @ApiPropertyOptional({ type: [AdminBranchStudentDto] })
  studentList?: AdminBranchStudentDto[];
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

