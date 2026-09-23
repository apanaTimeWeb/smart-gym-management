// RESPONSIBILITY: Validates BackupsScheduleDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsInt, IsString, Min } from 'class-validator';

export class BackupsScheduleDto {
  @IsString()
  cronExpression!: string;
  @IsInt()
  @Min(1)
  retentionDays!: number;
}