import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaaSInvoice } from './entities/invoices.entity';
import { CreateInvoicesController } from './controllers/create-invoices.controller';
import { FindInvoicesController } from './controllers/find-invoices.controller';
import { UpdateInvoicesController } from './controllers/update-invoices.controller';
import { DeleteInvoicesController } from './controllers/delete-invoices.controller';
import { CreateInvoicesService } from './services/create-invoices.service';
import { FindInvoicesService } from './services/find-invoices.service';
import { UpdateInvoicesService } from './services/update-invoices.service';
import { DeleteInvoicesService } from './services/delete-invoices.service';
import { InvoicesRepository } from './invoices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SaaSInvoice])],
  controllers: [CreateInvoicesController, FindInvoicesController, UpdateInvoicesController, DeleteInvoicesController],
  providers: [CreateInvoicesService, FindInvoicesService, UpdateInvoicesService, DeleteInvoicesService, InvoicesRepository],
})
export class InvoicesModule {}
