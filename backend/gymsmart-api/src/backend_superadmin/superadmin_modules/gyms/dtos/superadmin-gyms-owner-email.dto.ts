// RESPONSIBILITY: Validates owner email message input for the Gyms feature.
// FLOW: HTTP -> DTO -> email adapter/job boundary.
import { IsString, Length } from 'class-validator';
export class SuperadminGymsOwnerEmailDto {
  @IsString() @Length(1, 200) subject!: string;
  @IsString() @Length(1, 10000) message!: string;
}