// RESPONSIBILITY: Validates profile request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → ProfileUpdateTrainerProfileDto → service.

import { ArrayMaxSize, IsArray, IsString, MaxLength, MinLength } from 'class-validator';
export class ProfileUpdateTrainerProfileDto {
    @IsString() @MinLength(1) @MaxLength(160) name!:string; @IsString() @MaxLength(30) phone!:string; @IsArray() @ArrayMaxSize(10) specialization!:string[];
}
