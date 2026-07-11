import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import type {  MigrationStatus  } from '../migrations.interfaces';

export class CreateSchemaMigrationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  appliedAt?: Date | null;

  @IsString()
  @IsOptional()
  status?: MigrationStatus;


}
