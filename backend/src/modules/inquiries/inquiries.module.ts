import { Module } from '@nestjs/common';
import { InquiriesController } from '@/modules/inquiries/inquiries.controller';
import { InquiriesService } from '@/modules/inquiries/inquiries.service';

@Module({
  controllers: [InquiriesController],
  providers: [InquiriesService],
})
export class InquiriesModule {}
