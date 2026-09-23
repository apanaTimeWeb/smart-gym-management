// RESPONSIBILITY: Validates client-owned affiliate creation input only.
// FLOW: HTTP -> SuperadminAffiliatesCreateDto -> create service -> repository.
import { IsEmail, IsString, Length } from 'class-validator';
export class SuperadminAffiliatesCreateDto {
  @IsString() @Length(2, 80) name!: string;
  @IsEmail() email!: string;
  @IsString() @Length(4, 16) referralCode!: string;
}