import { PartialType } from '@nestjs/mapped-types';
import { CreateSaaSInvoiceDto } from './create-invoices.dto';

export class UpdateSaaSInvoiceDto extends PartialType(CreateSaaSInvoiceDto) {}
