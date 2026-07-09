import { Module } from '@nestjs/common';
import { StoreController } from '@/modules/store/store.controller';
import { StoreService } from '@/modules/store/store.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
