import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { GrievanceCategory } from '@/modules/manager/grievance/grievance.constants';

export class GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto extends CoreRequestDto {
  @IsString() @MinLength(1) @MaxLength(200) memberName!: string;
  @IsEnum(GrievanceCategory) category!: GrievanceCategory;
  @IsString() @MinLength(1) @MaxLength(2000) issue!: string;
}
