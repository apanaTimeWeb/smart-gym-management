// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin branches.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Branches response mapper → ApiResponse<T>.

export class AdminBranchesResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: name' })
  name?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchCode' })
  branchCode?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: gstNumber' })
  gstNumber?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: address' })
  address?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: contactPhone' })
  contactPhone?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: contactEmail' })
  contactEmail?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: openingTime' })
  openingTime?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: closingTime' })
  closingTime?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: maxCapacity' })
  maxCapacity?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: currentOccupancy' })
  currentOccupancy?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: equipmentCount' })
  equipmentCount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: revenue' })
  revenue?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: expenses' })
  expenses?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: studentsCount' })
  studentsCount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: staffCount' })
  staffCount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: expenseItems' })
  expenseItems?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: revenueItems' })
  revenueItems?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: staffList' })
  staffList?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: studentList' })
  studentList?: Record<string, unknown>;
}
