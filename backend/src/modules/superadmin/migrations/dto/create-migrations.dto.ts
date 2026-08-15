import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { MigrationStatus } from '../migrations.interfaces';

export class CreateSchemaMigrationDto {
  @IsString()
  name: string;

  @IsDateString()
  appliedAt: Date | null;

  @IsString()
  @IsOptional()
  status?: MigrationStatus;


}
