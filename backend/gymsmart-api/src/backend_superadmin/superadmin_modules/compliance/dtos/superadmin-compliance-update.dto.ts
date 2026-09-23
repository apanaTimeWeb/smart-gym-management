// RESPONSIBILITY: Validates partial updates at the compliance HTTP boundary.
// FLOW: HTTP JSON -> SuperadminComplianceUpdateDto -> Compliance service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminComplianceUpdateDto {
  @IsOptional()
  @IsString()
  kind!: string;
  @IsOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}