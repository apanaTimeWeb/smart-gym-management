// RESPONSIBILITY: Validates mutation fields exposed by the Admin branches frontend contract.
// FLOW: HTTP request body â†’ AdminBranchesMutationDto â†’ service business validation â†’ repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminBranchesMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  branchCode?: string;

  @IsOptional()
  @IsString()
  gstNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  openingTime?: string;

  @IsOptional()
  @IsString()
  closingTime?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxCapacity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  currentOccupancy?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  equipmentCount?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  revenue?: number;

  @IsOptional()
  @IsString()
  expenses?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  studentsCount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffCount?: number;

  @IsOptional()
  @IsObject()
  expenseItems?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  revenueItems?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  staffList?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  studentList?: Record<string, unknown>;
}
