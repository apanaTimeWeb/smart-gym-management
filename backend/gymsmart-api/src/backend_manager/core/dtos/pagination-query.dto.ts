// RESPONSIBILITY: Owns backend core API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type} from 'class-transformer';
import { IsInt, IsOptional, Max, Min} from 'class-validator';


export class PaginationQueryDto {
    @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit = 20;}

