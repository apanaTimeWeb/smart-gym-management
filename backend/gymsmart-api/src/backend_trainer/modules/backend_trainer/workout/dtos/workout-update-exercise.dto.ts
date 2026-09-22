// RESPONSIBILITY: Validates workout request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → WorkoutUpdateExerciseDto → service.

import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ExerciseDifficulty } from '@/backend_trainer/modules/backend_trainer/workout/workout-enums';
export class WorkoutUpdateExerciseDto {
    @IsOptional() @IsString() name?:string; @IsOptional() @IsString() category?:string; @IsOptional() @IsString() muscle?:string; @IsOptional() @IsString() equipment?:string; @IsOptional() @IsEnum(ExerciseDifficulty) difficulty?: ExerciseDifficulty; @IsOptional() @IsString() instructions?:string; @IsOptional() @IsString() videoUrl?:string; @IsOptional() @IsString() imageUrl?:string; @IsOptional() @IsString() reps?:string; @IsOptional() @IsString() duration?:string; @IsOptional() @IsString() description?:string;
}
