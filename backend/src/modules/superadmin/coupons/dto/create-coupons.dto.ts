import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({ description: 'Placeholder field for Coupon' })
  @IsString()
  @IsOptional()
  name?: string;
}
