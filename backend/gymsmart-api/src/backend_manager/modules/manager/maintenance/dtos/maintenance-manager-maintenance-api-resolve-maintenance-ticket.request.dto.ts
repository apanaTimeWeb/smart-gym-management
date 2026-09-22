import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /manager/maintenance/:id/resolve.
// FLOW: HTTP payload -> MaintenanceManagerMaintenanceApiResolveMaintenanceTicketRequestDto validation -> write use case -> orchestrator.

import { IsOptional } from 'class-validator';

export class MaintenanceManagerMaintenanceApiResolveMaintenanceTicketRequestDto extends CoreRequestDto {
}
