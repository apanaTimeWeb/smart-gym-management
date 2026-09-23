// RESPONSIBILITY: Validates creation payloads at the backups HTTP boundary.
// FLOW: HTTP JSON -> SuperadminBackupsCreateDto -> Backups service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum BackupsStatus { FAILED = 'FAILED', INPROGRESS = 'IN_PROGRESS', SUCCESS = 'SUCCESS', }
export class SuperadminBackupsCreateDto {
  @IsString()
  tenantName!: string;
  @IsString()
  databaseName!: string;
  @IsInt()
  @Min(0)
  sizeMB!: number;
  @IsEnum(BackupsStatus)
  status!: BackupsStatus;
  @Type(() => Date)
  @IsDate()
  timestamp!: Date;
}