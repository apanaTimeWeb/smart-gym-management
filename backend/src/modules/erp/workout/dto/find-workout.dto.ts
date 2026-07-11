import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FindWorkoutDto {
  @IsOptional()
  @IsString()
  memberId?: string;

  @IsOptional()
  @IsString()
  date?: string;
}
