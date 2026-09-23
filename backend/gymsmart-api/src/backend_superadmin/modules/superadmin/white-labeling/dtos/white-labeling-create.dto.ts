// RESPONSIBILITY: Validates creation payloads at the white-labeling HTTP boundary.
// FLOW: HTTP JSON -> WhiteLabelingCreateDto -> WhiteLabeling service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum WhiteLabelingStatus { Pending = 'pending', Active = 'active', Failed = 'failed', }
export enum WhiteLabelingSslStatus { Pending = 'pending', Issued = 'issued', Failed = 'failed', }
export class WhiteLabelingCreateDto {
  @IsString()
  gymId!: string;
  @IsString()
  gymName!: string;
  @IsString()
  domain!: string;
  @IsEnum(WhiteLabelingStatus)
  status!: WhiteLabelingStatus;
  @IsEnum(WhiteLabelingSslStatus)
  sslStatus!: WhiteLabelingSslStatus;
  @IsString()
  logoUrl!: string;
  @IsString()
  primaryColor!: string;
}