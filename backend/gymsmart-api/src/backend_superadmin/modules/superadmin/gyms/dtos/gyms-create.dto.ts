// RESPONSIBILITY: Validates standard Gym creation payloads for already-provisioned tenants without accepting server-managed fields.
// FLOW: HTTP POST /superadmin/gyms -> GymsCreateDto -> creation service.
import { IsEmail, IsString, Length } from 'class-validator';

export class GymsCreateDto {
  @IsString() @Length(2, 120) name!: string;
  @IsString() @Length(2, 120) ownerName!: string;
  @IsEmail() adminEmail!: string;
  @IsString() @Length(7, 20) phone!: string;
  @IsString() plan!: string;
}
