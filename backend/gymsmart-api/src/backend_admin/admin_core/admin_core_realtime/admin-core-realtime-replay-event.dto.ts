// RESPONSIBILITY: Defines the public Admin realtime replay event shape returned to reconnecting clients.
// FLOW: Persisted realtime entity -> replay mapper -> AdminCoreRealtimeReplayEventDto -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description Defines the public durable realtime event representation returned during reconnect replay.
 * @remarks The tenant identifier is intentionally omitted from the public payload because the server has already enforced tenant scope.
 */
export class AdminCoreRealtimeReplayEventDto {
  /** @description Stable durable event identifier. */
  @ApiProperty({ format: 'uuid' })
  id!: string;

  /** @description Registered realtime event name. */
  @ApiProperty()
  eventName!: string;

  /** @description Event payload delivered to the authorized tenant. */
  @ApiProperty({ type: Object })
  payload!: Record<string, unknown>;

  /** @description UTC timestamp when the event was durably persisted. */
  @ApiProperty({ format: 'date-time' })
  createdAt!: string;
}
