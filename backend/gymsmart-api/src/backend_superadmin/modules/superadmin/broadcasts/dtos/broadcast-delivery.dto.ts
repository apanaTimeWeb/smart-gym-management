// RESPONSIBILITY: Validates the selected broadcast recipient delivery command.
// FLOW: HTTP body -> strict validation -> delivery service.
import { IsUUID } from 'class-validator';

export class BroadcastDeliveryDto {
  @IsUUID()
  broadcastId!: string;

  @IsUUID()
  recipientId!: string;
}
