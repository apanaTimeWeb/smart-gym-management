// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerPtFetchPackagesResponseDto {
  @ApiProperty()
  description!: string;

  @ApiProperty({ type: Number })
  durationDays!: number;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: Number })
  price!: number;

  @ApiProperty({ type: Number })
  sessionCount!: number;

  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerPtFetchPackagesResponseDto as PtFetchPackagesResponseDto };
