// RESPONSIBILITY: Validates the request body for Manager grievance operation `ManagerGrievanceApi.createGrievanceTicket`.
// FLOW: HTTP body -> endpoint DTO -> use-case service -> orchestrator -> repository.
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  status!: string;

}
