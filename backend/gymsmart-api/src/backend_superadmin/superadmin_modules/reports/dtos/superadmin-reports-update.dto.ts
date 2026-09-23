// RESPONSIBILITY: Validates partial updates at the reports HTTP boundary.
// FLOW: HTTP JSON -> SuperadminReportsUpdateDto -> Reports service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminReportsUpdateDto {
  @IsOptional()
  @IsString()
  kind!: string;
  @IsOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}