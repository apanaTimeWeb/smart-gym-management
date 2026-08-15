import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupons.entity';
import { CreateCouponsController } from './controllers/create-coupons.controller';
import { FindCouponsController } from './controllers/find-coupons.controller';
import { UpdateCouponsController } from './controllers/update-coupons.controller';
import { DeleteCouponsController } from './controllers/delete-coupons.controller';
import { CreateCouponsService } from './services/create-coupons.service';
import { FindCouponsService } from './services/find-coupons.service';
import { UpdateCouponsService } from './services/update-coupons.service';
import { DeleteCouponsService } from './services/delete-coupons.service';
import { CouponsRepository } from './coupons.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  controllers: [CreateCouponsController, FindCouponsController, UpdateCouponsController, DeleteCouponsController],
  providers: [CreateCouponsService, FindCouponsService, UpdateCouponsService, DeleteCouponsService, CouponsRepository],
  exports: [CouponsRepository],
})
export class CouponsModule {}
