// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class NotificationsFetchManagerNotificationsResponseDto {
  @ApiProperty({ type: [Object] })
  notifications?: Array<{ createdAt: string; memberName: string; message: number; priority: string; status: string; title: string; type: string; }>;

}
