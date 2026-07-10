import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliatesService } from './services/affiliates.service';
import { AffiliatesController } from './controllers/affiliates.controller';
import { Affiliate } from './entities/affiliates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Affiliate])],
  controllers: [AffiliatesController],
  providers: [AffiliatesService],
})
export class AffiliatesModule {}
