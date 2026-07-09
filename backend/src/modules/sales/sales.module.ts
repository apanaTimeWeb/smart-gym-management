import { Module } from '@nestjs/common';
import { FindSalesController } from './controllers/find-sales.controller';
import { FindSalesService } from './services/find-sales.service';

@Module({
  controllers: [FindSalesController],
  providers: [FindSalesService],
})
export class SalesModule {}
