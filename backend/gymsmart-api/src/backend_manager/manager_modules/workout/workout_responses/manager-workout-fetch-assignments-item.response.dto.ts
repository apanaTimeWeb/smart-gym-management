// RESPONSIBILITY: Defines a typed item in the owning Manager response contract.
// FLOW: Feature data row -> explicit item fields -> parent response DTO.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerWorkoutFetchAssignmentsItemResponseDto {
  @ApiProperty({ required: false })
  assignedBy?: string;
  @ApiProperty()
  memberName!: string;
  @ApiProperty()
  planName!: string;
  @ApiProperty()
  startDate!: string;
}

export { ManagerWorkoutFetchAssignmentsItemResponseDto as WorkoutFetchAssignmentsItemResponseDto };
