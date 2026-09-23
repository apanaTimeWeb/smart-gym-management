// RESPONSIBILITY: Validates partial updates at the migrations HTTP boundary.
// FLOW: HTTP JSON -> SuperadminMigrationsUpdateDto -> Migrations service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum MigrationsStatus { PENDING = 'PENDING', INPROGRESS = 'IN_PROGRESS', COMPLETED = 'COMPLETED', FAILED = 'FAILED', ROLLEDBACK = 'ROLLED_BACK', SUCCESS = 'SUCCESS', ROLLBACK = 'ROLLBACK', }
export class SuperadminMigrationsUpdateDto {
  @IsOptional()
  @IsString()
  version!: string;
  @IsOptional()
  @IsString()
  description!: string;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  appliedAt!: Date;
  @IsOptional()
  @IsEnum(MigrationsStatus)
  status!: MigrationsStatus;
  @IsOptional()
  targetTenants!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @IsInt()
  @Min(0)
  durationMs!: number;
  @IsOptional()
  @IsString()
  errorLog!: string;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  executedAt!: Date;
  @IsOptional()
  @IsString()
  executedBy!: string;
  @IsOptional()
  @IsString()
  errorDetails!: string;
}