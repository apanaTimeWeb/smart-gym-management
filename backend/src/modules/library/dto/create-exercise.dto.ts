import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ description: 'Exercise name', example: 'Push Day' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description',
    example: 'Chest, shoulders, triceps',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Category', example: 'Strength' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Difficulty level', example: 'Intermediate' })
  @IsString()
  difficulty: string;

  @ApiProperty({ description: 'Is active', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
