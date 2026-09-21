// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class BackupsHealthResponseDto {
  @ApiProperty()
  summary!: { healthy: number; warning: number; failed: number; lastRestoreTest: string; restoreTestStatus: string; recoveryPointTarget: string; recoveryTimeTarget: string };
  @ApiProperty()
  tenants!: Array<{ gym: string; lastBackup: string; size: string; ageHours: number; status: string }>;
  @ApiProperty()
  restoreHistory!: Array<{ date: string; scope: string; durationMinutes: number; status: string }>;
}
