// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class GymsBusinessControlsResponseDto {
  @ApiProperty({ example: 'INR' })
  currency!: string;
  @ApiProperty()
  segments!: Array<{ name: string; count: number; rule: string }>;
  @ApiProperty()
  filters!: Array<{ key: string; label: string }>;
  @ApiProperty()
  bulk!: Array<'Send message' | 'Extend trial' | 'Export selected' | 'Move plan' | 'Suspend selected'>;
  @ApiProperty()
  saved!: Array<{ key: string; label: string }>;
  @ApiProperty()
  rows!: Array<{ id: string; name: string; status: string; region: string; plan: string; income: number; health: number; usage: number; trialDays: number; paymentRecoveryOpen: boolean; lastAction: string | null }>;
}