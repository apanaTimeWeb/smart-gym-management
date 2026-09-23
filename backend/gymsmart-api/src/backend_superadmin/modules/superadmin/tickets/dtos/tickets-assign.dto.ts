// RESPONSIBILITY: Validates TicketsAssignDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsString } from 'class-validator';

export class TicketsAssignDto {
  @IsString()
  assignee!: string;
}