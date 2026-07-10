import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindSalesDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by member status' })
  @IsOptional()
  @IsString()
  status?: string;
}
