import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupons.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
