// RESPONSIBILITY: Validates the partial session update contract derived from the frontend create-session shape.
// FLOW: HTTP body → SessionsUpdateSessionDto → SessionsCommandService → repository mutation.

import { SessionRecurrence, SessionType } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-enums';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class SessionsUpdateSessionDto {
  @IsOptional() @IsUUID() memberId?: string;
  @IsOptional() @IsDateString() date?: string;
  @IsOptional() @IsString() time?: string;
  @IsOptional() @IsString() duration?: string;
  @IsOptional() @IsEnum(SessionType) type?: SessionType;
  @IsOptional() @IsEnum(SessionRecurrence) recurrenceType?: SessionRecurrence;
  @IsOptional() @IsDateString() recurrenceEndDate?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() room?: string;
}
