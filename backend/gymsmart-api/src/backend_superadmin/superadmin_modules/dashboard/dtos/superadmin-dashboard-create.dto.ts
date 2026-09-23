// RESPONSIBILITY: Validates creation payloads at the dashboard HTTP boundary.
// FLOW: HTTP JSON -> SuperadminDashboardCreateDto -> Dashboard service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminDashboardCreateDto {
  @IsString()
  kind!: string;
  payload!: Record<string, unknown> | unknown[] | null;
}