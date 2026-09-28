// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { GrievanceCategory } from '@/backend_manager/manager_modules/grievance/manager-grievance.constants';

export class ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto extends CoreRequestDto {
  @IsString() @MinLength(1) @MaxLength(200) memberName!: string;
  @IsEnum(GrievanceCategory) category!: GrievanceCategory;
  @IsString() @MinLength(1) @MaxLength(2000) issue!: string;
}

export { ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto as GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto };
