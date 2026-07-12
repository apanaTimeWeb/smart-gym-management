import { NotesFeaturesService } from './services/notes-features.service';
import { ToggleFeaturesService } from './services/toggle-features.service';
import { FlagsFeaturesService } from './services/flags-features.service';
import { NotesFeaturesController } from './controllers/notes-features.controller';
import { ToggleFeaturesController } from './controllers/toggle-features.controller';
import { FlagsFeaturesController } from './controllers/flags-features.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlag } from './entities/feature-flag.entity';
import { ReleaseNote } from './entities/release-note.entity';
import { CreateFeaturesController } from './controllers/create-features.controller';
import { FindFeaturesController } from './controllers/find-features.controller';
import { UpdateFeaturesController } from './controllers/update-features.controller';
import { DeleteFeaturesController } from './controllers/delete-features.controller';
import { CreateFeaturesService } from './services/create-features.service';
import { FindFeaturesService } from './services/find-features.service';
import { UpdateFeaturesService } from './services/update-features.service';
import { DeleteFeaturesService } from './services/delete-features.service';
import { FeaturesRepository } from './features.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureFlag, ReleaseNote])],
  controllers: [NotesFeaturesController, ToggleFeaturesController, FlagsFeaturesController, CreateFeaturesController, FindFeaturesController, UpdateFeaturesController, DeleteFeaturesController],
  providers: [NotesFeaturesService, ToggleFeaturesService, FlagsFeaturesService, CreateFeaturesService, FindFeaturesService, UpdateFeaturesService, DeleteFeaturesService, FeaturesRepository],
  exports: [CreateFeaturesService, FindFeaturesService, UpdateFeaturesService, DeleteFeaturesService],
})
export class FeaturesModule {}
