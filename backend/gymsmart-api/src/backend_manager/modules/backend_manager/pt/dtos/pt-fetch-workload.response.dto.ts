// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class PtFetchWorkloadResponseDto {
  @ApiProperty({ type: Number })
  activeClients!: number;

  @ApiProperty({ type: [Object] })
  data!: Array<{activeClients?: string; trainerName: string;}>;

  @ApiProperty({ type: Number })
  rating!: number;

  @ApiProperty({ type: Number })
  totalSessionsConducted!: number;

  @ApiProperty()
  trainerId!: string;

  @ApiProperty()
  trainerName!: string;

}
