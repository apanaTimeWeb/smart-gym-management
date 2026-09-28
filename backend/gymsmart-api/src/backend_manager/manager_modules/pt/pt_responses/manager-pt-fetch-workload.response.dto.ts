// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';
import { PtFetchWorkloadItemResponseDto } from '@/backend_manager/manager_modules/pt/pt_responses/manager-pt-fetch-workload-item.response.dto';

export class ManagerPtFetchWorkloadResponseDto {
  @ApiProperty({ type: Number })
  activeClients!: number;

  @ApiProperty({ type: [PtFetchWorkloadItemResponseDto] })
  data!: Array<PtFetchWorkloadItemResponseDto>;

  @ApiProperty({ type: Number })
  rating!: number;

  @ApiProperty({ type: Number })
  totalSessionsConducted!: number;

  @ApiProperty()
  trainerId!: string;

  @ApiProperty()
  trainerName!: string;

}

export { ManagerPtFetchWorkloadResponseDto as PtFetchWorkloadResponseDto };
