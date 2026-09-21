// RESPONSIBILITY: Validates mutation fields exposed by the Admin hr frontend contract.
// FLOW: HTTP request body → AdminHrMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminHrMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  staff?: string;

  @IsOptional()
  @IsString()
  total?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  employeeId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsString()
  branch?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  aadhaar?: string;

  @IsOptional()
  @IsString()
  upiId?: string;

  @IsOptional()
  @IsString()
  bankAccountNumber?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  advanceSalary?: number;

  @IsOptional()
  @IsString()
  joinDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  salaryType?: string;

  @IsOptional()
  @IsString()
  paymentCycle?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  currentDue?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedBranches?: string[];

  @IsOptional()
  @IsString()
  primaryBranchId?: string;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @IsOptional()
  @IsString()
  contractType?: string;

  @IsOptional()
  @IsString()
  terminationDate?: string;

  @IsOptional()
  @IsString()
  payrolls?: string;

  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  amount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  paidAmount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pendingAmount?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  paidAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsObject()
  ledger?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  advances?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  performance?: Record<string, unknown>;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ids?: string[];
}
