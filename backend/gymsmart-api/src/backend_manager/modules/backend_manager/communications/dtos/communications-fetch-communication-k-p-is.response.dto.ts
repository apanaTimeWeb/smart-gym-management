// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class CommunicationsFetchCommunicationKPIsResponseDto {
  @ApiProperty({ type: Number })
  campaignsThisMonth!: number;

  @ApiProperty({ type: Number })
  emailSent!: number;

  @ApiProperty({ type: Number })
  totalSent!: number;

  @ApiProperty({ type: Number })
  whatsappSent!: number;

}
