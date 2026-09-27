// RESPONSIBILITY: Defines a typed item in the owning Manager response contract.
// FLOW: Feature data row -> explicit item fields -> parent response DTO.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerPtFetchWorkloadItemResponseDto {
  @ApiProperty({ required: false })
  activeClients?: string;
  @ApiProperty()
  trainerName!: string;
}

export { ManagerPtFetchWorkloadItemResponseDto as PtFetchWorkloadItemResponseDto };
