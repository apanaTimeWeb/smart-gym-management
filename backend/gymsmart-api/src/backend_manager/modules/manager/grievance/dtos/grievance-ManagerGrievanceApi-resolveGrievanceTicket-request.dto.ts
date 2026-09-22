// RESPONSIBILITY: Validates the request body for Manager grievance operation `ManagerGrievanceApi.resolveGrievanceTicket`.
// FLOW: HTTP body -> endpoint DTO -> use-case service -> orchestrator -> repository.
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  resolutionNote!: string;

}
