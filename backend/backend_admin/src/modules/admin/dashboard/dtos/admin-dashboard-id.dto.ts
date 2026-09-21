// RESPONSIBILITY: Validates identifiers used by destructive or action endpoints.
// FLOW: HTTP body → Id DTO → command service → named repository mutation.

import { IsUUID } from 'class-validator';

export class AdminDashboardIdDto {
  @IsUUID()
  id!: string;
}
