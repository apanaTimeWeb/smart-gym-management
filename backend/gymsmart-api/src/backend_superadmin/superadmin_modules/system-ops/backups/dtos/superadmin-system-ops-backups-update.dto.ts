// RESPONSIBILITY: Validates partial updates at the backups HTTP boundary.
// FLOW: HTTP JSON -> SuperadminBackupsUpdateDto -> Backups service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum BackupsStatus { FAILED = 'FAILED', INPROGRESS = 'IN_PROGRESS', SUCCESS = 'SUCCESS', }
export class SuperadminBackupsUpdateDto {
  @IsOptional()
  @IsString()
  tenantName!: string;
  @IsOptional()
  @IsString()
  databaseName!: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  sizeMB!: number;
  @IsOptional()
  @IsEnum(BackupsStatus)
  status!: BackupsStatus;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  timestamp!: Date;
}