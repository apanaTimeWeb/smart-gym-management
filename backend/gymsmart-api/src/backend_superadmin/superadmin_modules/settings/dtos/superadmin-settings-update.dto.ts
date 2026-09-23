// RESPONSIBILITY: Validates partial updates at the settings HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSettingsUpdateDto -> Settings service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminSettingsUpdateDto {
  @IsOptional()
  @IsString()
  key!: string;
  @IsOptional()
  @IsString()
  value!: string;
  @IsOptional()
  @IsString()
  description!: string;
  @IsOptional()
  @IsString()
  category!: string;
  @IsOptional()
  @IsString()
  dataType!: string;
}