// RESPONSIBILITY: Validates creation payloads at the dashboard HTTP boundary.
// FLOW: HTTP JSON -> DashboardCreateDto -> Dashboard service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class DashboardCreateDto {
  @IsString()
  kind!: string;
  payload!: Record<string, unknown> | unknown[] | null;
}
