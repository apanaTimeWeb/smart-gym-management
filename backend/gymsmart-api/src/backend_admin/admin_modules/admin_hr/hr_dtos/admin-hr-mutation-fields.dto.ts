// RESPONSIBILITY: Validates non-status Admin HR mutation fields inherited by the public HR request DTO.
// FLOW: HTTP request -> AdminHrMutationDto -> inherited field decorators -> service validation.
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * @description Isolates the broad HR mutation field set so the public DTO remains within the AI context-size ceiling.
 * @remarks Sensitive HR values are encrypted at the repository boundary; this class only validates transport data.
 */
export class AdminHrMutationFieldsDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  staff?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  total?: string;
@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  employeeId?: number;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  name?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  email?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  phone?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  role?: string;
@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsInt()
  salary?: number;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  branch?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  gender?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  address?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  aadhaar?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  upiId?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  bankAccountNumber?: string;
@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  advanceSalary?: number;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  joinDate?: string;
@ApiPropertyOptional() @IsOptional()
  @IsBoolean()
  isActive?: boolean;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  salaryType?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  paymentCycle?: string;
@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  currentDue?: number;
@ApiPropertyOptional() @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedBranches?: string[];
@ApiPropertyOptional() @IsOptional()
  @IsString()
  primaryBranchId?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  emergencyContactName?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  emergencyContactPhone?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  department?: string;
@ApiPropertyOptional() @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];
@ApiPropertyOptional() @IsOptional()
  @IsString()
  contractType?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  terminationDate?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  payrolls?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  month?: string;
@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsInt()
  amount?: number;
@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsInt()
  paidAmount?: number;
@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsInt()
  pendingAmount?: number;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  paidAt?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  notes?: string;
@ApiPropertyOptional() @IsOptional()
  @IsObject()
  ledger?: Record<string, unknown>;
@ApiPropertyOptional() @IsOptional()
  @IsObject()
  advances?: Record<string, unknown>;
@ApiPropertyOptional() @IsOptional()
  @IsObject()
  performance?: Record<string, unknown>;
@ApiPropertyOptional() @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ids?: string[];
}
