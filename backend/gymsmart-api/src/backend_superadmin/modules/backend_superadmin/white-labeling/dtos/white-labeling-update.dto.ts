// RESPONSIBILITY: Validates partial updates at the white-labeling HTTP boundary.
// FLOW: HTTP JSON -> WhiteLabelingUpdateDto -> WhiteLabeling service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum WhiteLabelingStatus { Pending = 'pending', Active = 'active', Failed = 'failed', }
export enum WhiteLabelingSslStatus { Pending = 'pending', Issued = 'issued', Failed = 'failed', }
export class WhiteLabelingUpdateDto {
  @IsOptional()
  @IsString()
  gymId!: string;
  @IsOptional()
  @IsString()
  gymName!: string;
  @IsOptional()
  @IsString()
  domain!: string;
  @IsOptional()
  @IsEnum(WhiteLabelingStatus)
  status!: WhiteLabelingStatus;
  @IsOptional()
  @IsEnum(WhiteLabelingSslStatus)
  sslStatus!: WhiteLabelingSslStatus;
  @IsOptional()
  @IsString()
  logoUrl!: string;
  @IsOptional()
  @IsString()
  primaryColor!: string;
}