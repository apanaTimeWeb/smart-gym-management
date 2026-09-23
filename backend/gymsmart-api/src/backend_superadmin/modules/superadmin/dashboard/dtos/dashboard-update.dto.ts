// RESPONSIBILITY: Validates partial updates at the dashboard HTTP boundary.
// FLOW: HTTP JSON -> DashboardUpdateDto -> Dashboard service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class DashboardUpdateDto {
  @IsOptional()
  @IsString()
  kind!: string;
  @IsOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}