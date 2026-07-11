import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProvisionTenantDto {
  @ApiProperty({
    description: 'The unique identifier of the gym tenant whose database should be provisioned',
    example: 't-106',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  tenantId: string;
}
