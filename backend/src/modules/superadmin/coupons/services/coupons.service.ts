import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_COUPONS } from '../../superadmin.constants';
import { CreateCouponDto } from '../dto/create-coupons.dto';
import { UpdateCouponDto } from '../dto/update-coupons.dto';

@Injectable()
export class CouponsService {
  private readonly logger = new Logger(CouponsService.name);

  create(createDto: CreateCouponDto) {
    this.logger.log(`Creating coupon: ${createDto.code}`);
    return {
      success: true,
      message: 'Coupon created successfully',
      data: {
        id: `cpn-${Date.now()}`,
        ...createDto,
        currentUses: createDto.currentUses ?? 0,
        status: createDto.status ?? 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all coupons');
    return {
      success: true,
      message: 'Coupons fetched successfully',
      data: DUMMY_COUPONS,
      meta: { total: DUMMY_COUPONS.length },
    };
  }

  findOne(id: string) {
    const coupon = DUMMY_COUPONS.find((c) => c.id === id);
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID "${id}" not found`);
    }
    return { success: true, message: 'Coupon fetched successfully', data: coupon };
  }

  update(id: string, updateDto: UpdateCouponDto) {
    const coupon = DUMMY_COUPONS.find((c) => c.id === id);
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID "${id}" not found`);
    }
    this.logger.log(`Updating coupon: ${id}`);
    return {
      success: true,
      message: 'Coupon updated successfully',
      data: { ...coupon, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  remove(id: string) {
    const coupon = DUMMY_COUPONS.find((c) => c.id === id);
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting coupon: ${id}`);
    return {
      success: true,
      message: 'Coupon removed successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
