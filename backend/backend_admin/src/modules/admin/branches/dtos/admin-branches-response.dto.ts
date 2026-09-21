// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin branches.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Branches response mapper → ApiResponse<T>.

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
}

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
}

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
  status!: string;
}

export class AdminBranchStudentDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  plan!: string;
  @ApiProperty({ enum: ['active', 'expired'] })
  status!: string;
  @ApiProperty()
  joinDate!: string;
}

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
  status!: string;
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
}

