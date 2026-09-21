// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class PlansBusinessControlsResponseDto {
  @ApiProperty()
  plans!: Array<{ name: string; monthly: number; members: number; storage: number; branches: number }>;
  @ApiProperty()
  versions!: Array<{ plan: string; version: string; effective: string; monthly: number; change: string }>;
  @ApiProperty()
  addons!: Array<{ name: string; price: number }>;
  @ApiProperty()
  migration!: { from: string; to: string; tenants: number; monthlyChange: number; limitConflicts: number };
}
