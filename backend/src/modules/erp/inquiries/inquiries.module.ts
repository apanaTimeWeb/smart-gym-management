import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Inquiry } from './entities/inquiry.entity';
import { InquiriesRepository } from './inquiries.repository';

import { CreateInquiryController } from './controllers/create-inquiry.controller';
import { FindInquiryController } from './controllers/find-inquiry.controller';
import { UpdateInquiryController } from './controllers/update-inquiry.controller';
import { InquiryStatsController } from './controllers/inquiry-stats.controller';

import { CreateInquiryService } from './services/create-inquiry.service';
import { FindInquiryService } from './services/find-inquiry.service';
import { UpdateInquiryService } from './services/update-inquiry.service';
import { InquiryStatsService } from './services/inquiry-stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry])],
  controllers: [
    CreateInquiryController,
    FindInquiryController,
    UpdateInquiryController,
    InquiryStatsController,
  ],
  providers: [
    InquiriesRepository,
    CreateInquiryService,
    FindInquiryService,
    UpdateInquiryService,
    InquiryStatsService,
  ],
})
export class InquiriesModule {}
