import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affiliate } from './entities/affiliates.entity';
import { CreateAffiliatesController } from './controllers/create-affiliates.controller';
import { FindAffiliatesController } from './controllers/find-affiliates.controller';
import { UpdateAffiliatesController } from './controllers/update-affiliates.controller';
import { DeleteAffiliatesController } from './controllers/delete-affiliates.controller';
import { CreateAffiliatesService } from './services/create-affiliates.service';
import { FindAffiliatesService } from './services/find-affiliates.service';
import { UpdateAffiliatesService } from './services/update-affiliates.service';
import { DeleteAffiliatesService } from './services/delete-affiliates.service';
import { AffiliatesRepository } from './affiliates.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Affiliate])],
  controllers: [CreateAffiliatesController, FindAffiliatesController, UpdateAffiliatesController, DeleteAffiliatesController],
  providers: [CreateAffiliatesService, FindAffiliatesService, UpdateAffiliatesService, DeleteAffiliatesService, AffiliatesRepository],
  exports: [AffiliatesRepository],
})
export class AffiliatesModule {}
