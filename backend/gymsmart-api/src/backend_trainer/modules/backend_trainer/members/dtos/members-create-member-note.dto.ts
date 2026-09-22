// RESPONSIBILITY: Validates members request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → MembersCreateMemberNoteDto → service.

import { IsString, MaxLength, MinLength } from 'class-validator';
export class MembersCreateMemberNoteDto {
    @IsString() @MinLength(1) @MaxLength(2000) text!:string;
}
