// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class WorkoutFetchAssignmentsResponseDto {
  @ApiProperty()
  assignedBy!: string;

  @ApiProperty({ type: [Object] })
  data!: Array<{assignedBy?: string; memberName: string; planName: string; startDate: string;}>;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  memberName!: string;

  @ApiProperty()
  planName!: string;

  @ApiProperty()
  startDate!: string;

}
