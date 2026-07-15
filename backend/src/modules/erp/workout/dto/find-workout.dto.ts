import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';

export class FindWorkoutDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  memberId?: string;

  @IsOptional()
  @IsString()
  date?: string;
}
