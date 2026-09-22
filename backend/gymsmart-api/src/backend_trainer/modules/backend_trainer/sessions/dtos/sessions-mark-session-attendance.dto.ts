// RESPONSIBILITY: Validates the frontend member attendance selection for one trainer session.
// FLOW: HTTP body → SessionsMarkSessionAttendanceDto → SessionsCommandService.

import { ArrayMaxSize, IsArray, IsUUID } from 'class-validator';

export class SessionsMarkSessionAttendanceDto {
  @IsArray() @ArrayMaxSize(100) @IsUUID('4', { each: true }) memberIds!: string[];
}
