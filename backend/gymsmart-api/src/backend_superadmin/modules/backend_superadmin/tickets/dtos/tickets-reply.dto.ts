// RESPONSIBILITY: Validates TicketsReplyDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsString } from 'class-validator';

export class TicketsReplyDto {
  @IsString()
  replyText!: string;
}