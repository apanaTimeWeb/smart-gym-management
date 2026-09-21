// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin hr.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Hr response mapper → ApiResponse<T>.

export class AdminHrResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: staff' })
  staff?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: total' })
  total?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: employeeId' })
  employeeId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: name' })
  name?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: email' })
  email?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: phone' })
  phone?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: role' })
  role?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: salary' })
  salary?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: branch' })
  branch?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: gender' })
  gender?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: address' })
  address?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: aadhaar' })
  aadhaar?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: upiId' })
  upiId?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: bankAccountNumber' })
  bankAccountNumber?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: advanceSalary' })
  advanceSalary?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: joinDate' })
  joinDate?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: isActive' })
  isActive?: boolean;
  @ApiProperty({ required: false, description: 'Frontend contract field: salaryType' })
  salaryType?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: paymentCycle' })
  paymentCycle?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: currentDue' })
  currentDue?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: assignedBranches' })
  assignedBranches?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: primaryBranchId' })
  primaryBranchId?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: emergencyContactName' })
  emergencyContactName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: emergencyContactPhone' })
  emergencyContactPhone?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: department' })
  department?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: certifications' })
  certifications?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: contractType' })
  contractType?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: terminationDate' })
  terminationDate?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: payrolls' })
  payrolls?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: month' })
  month?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: amount' })
  amount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: paidAmount' })
  paidAmount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: pendingAmount' })
  pendingAmount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: paidAt' })
  paidAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: notes' })
  notes?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: ledger' })
  ledger?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: advances' })
  advances?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: performance' })
  performance?: Record<string, unknown>;
}
