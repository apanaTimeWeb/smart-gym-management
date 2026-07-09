import { Module } from '@nestjs/common';
import { InquiriesController } from '@/modules/inquiries/inquiries.controller';
import { InquiriesService } from '@/modules/inquiries/inquiries.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from './entities/inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry])],
  controllers: [InquiriesController],
  providers: [InquiriesService],
})
export class InquiriesModule {}
