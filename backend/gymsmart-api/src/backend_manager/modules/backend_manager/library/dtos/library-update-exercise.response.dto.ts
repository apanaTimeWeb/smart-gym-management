// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class LibraryUpdateExerciseResponseDto {
  @ApiProperty()
  category!: string;

  @ApiProperty()
  difficulty!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty({ type: Boolean })
  isActive!: boolean;

  @ApiProperty()
  name!: string;

}
