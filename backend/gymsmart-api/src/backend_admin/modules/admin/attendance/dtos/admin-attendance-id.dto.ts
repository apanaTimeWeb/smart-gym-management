// RESPONSIBILITY: Validates identifiers used by destructive or action endpoints.
// FLOW: HTTP body â†’ Id DTO â†’ command service â†’ named repository mutation.

import { IsUUID } from 'class-validator';

export class AdminAttendanceIdDto {
  @IsUUID()
  id!: string;
}
