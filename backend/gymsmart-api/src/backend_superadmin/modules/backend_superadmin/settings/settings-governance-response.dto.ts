// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class SettingsGovernanceResponseDto {
  @ApiProperty()
  billing!: Array<{ label: string; value: string }>;
  @ApiProperty()
  security!: Array<{ label: string; value: string }>;
  @ApiProperty()
  data!: Array<{ label: string; value: string }>;
  @ApiProperty()
  communication!: Array<{ label: string; value: string }>;
}