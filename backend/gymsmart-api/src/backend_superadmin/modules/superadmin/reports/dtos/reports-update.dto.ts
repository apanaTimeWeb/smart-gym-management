// RESPONSIBILITY: Validates partial updates at the reports HTTP boundary.
// FLOW: HTTP JSON -> ReportsUpdateDto -> Reports service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class ReportsUpdateDto {
  @IsOptional()
  @IsString()
  kind!: string;
  @IsOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}
