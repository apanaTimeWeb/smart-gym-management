// RESPONSIBILITY: Validates sessions request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → SessionsCreateSessionDto → service.

import { SessionRecurrence, SessionStatus, SessionType } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-enums';
import { IsDateString, IsEnum, IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min, MinLength } from 'class-validator';
export class SessionsCreateSessionDto {
    @IsOptional() @IsUUID() memberId?:string; @IsDateString() date!:string; @IsString() time!:string; @IsString() @MinLength(1) duration!:string; @IsEnum(SessionType) type!: SessionType; @IsOptional() @IsEnum(SessionRecurrence) recurrenceType?:SessionRecurrence; @IsOptional() @IsDateString() recurrenceEndDate?:string; @IsOptional() @IsString() location?:string; @IsOptional() @IsString() room?:string;
}
