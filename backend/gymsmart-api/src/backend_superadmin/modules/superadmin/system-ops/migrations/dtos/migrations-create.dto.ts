// RESPONSIBILITY: Validates creation payloads at the migrations HTTP boundary.
// FLOW: HTTP JSON -> MigrationsCreateDto -> Migrations service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum MigrationsStatus { PENDING = 'PENDING', INPROGRESS = 'IN_PROGRESS', COMPLETED = 'COMPLETED', FAILED = 'FAILED', ROLLEDBACK = 'ROLLED_BACK', SUCCESS = 'SUCCESS', ROLLBACK = 'ROLLBACK', }
export class MigrationsCreateDto {
  @IsString()
  version!: string;
  @IsString()
  description!: string;
  @Type(() => Date)
  @IsDate()
  appliedAt!: Date;
  @IsEnum(MigrationsStatus)
  status!: MigrationsStatus;
  targetTenants!: Record<string, unknown> | unknown[] | null;
  @IsInt()
  @Min(0)
  durationMs!: number;
  @IsString()
  errorLog!: string;
  @Type(() => Date)
  @IsDate()
  executedAt!: Date;
  @IsString()
  executedBy!: string;
  @IsString()
  errorDetails!: string;
}
