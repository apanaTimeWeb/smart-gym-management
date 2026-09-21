// RESPONSIBILITY: Validates creation payloads at the compliance HTTP boundary.
// FLOW: HTTP JSON -> ComplianceCreateDto -> Compliance service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class ComplianceCreateDto {
  @IsString()
  kind!: string;
  payload!: Record<string, unknown> | unknown[] | null;
}
