import { IsString, IsNotEmpty } from 'class-validator';

export class EmailTenantDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
