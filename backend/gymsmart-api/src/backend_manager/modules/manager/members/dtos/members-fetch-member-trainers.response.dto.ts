// RESPONSIBILITY: Response DTO for Manager member trainer lookup.
// FLOW: Query service -> response DTO -> canonical ApiResponse<T>.
import { ApiProperty } from '@nestjs/swagger';

export class MembersFetchMemberTrainersResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() role!: string;
}
