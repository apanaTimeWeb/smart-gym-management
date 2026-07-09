import { Module } from '@nestjs/common';
import { DashboardController } from '@/modules/dashboard/dashboard.controller';
import { DashboardService } from '@/modules/dashboard/dashboard.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '@/modules/members/entities/member.entity';
import { Payment } from '@/modules/finance/entities/payment.entity';
import { Staff } from '@/modules/hr/entities/staff.entity';
import { Product } from '@/modules/store/entities/product.entity';
import { Inquiry } from '@/modules/inquiries/entities/inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Payment, Staff, Product, Inquiry])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
