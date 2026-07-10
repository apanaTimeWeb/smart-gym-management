import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_INVOICES, DUMMY_TENANTS } from '../../superadmin.constants';
import { CreateInvoiceDto } from '../dto/create-invoices.dto';
import { UpdateInvoiceDto } from '../dto/update-invoices.dto';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  create(createDto: CreateInvoiceDto) {
    this.logger.log(`Creating SaaS invoice for tenant: ${createDto.tenantName}`);
    return {
      success: true,
      message: 'Invoice created successfully',
      data: {
        id: `inv-${Date.now()}`,
        ...createDto,
        currency: createDto.currency ?? 'USD',
        status: createDto.status ?? 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all SaaS invoices');
    return {
      success: true,
      message: 'Invoices fetched successfully',
      data: {
        invoices: DUMMY_INVOICES,
        tenants: DUMMY_TENANTS,
      },
      meta: { total: DUMMY_INVOICES.length },
    };
  }

  findOne(id: string) {
    const invoice = DUMMY_INVOICES.find((i) => i.id === id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID "${id}" not found`);
    }
    return {
      success: true,
      message: 'Invoice fetched successfully',
      data: invoice,
    };
  }

  update(id: string, updateDto: UpdateInvoiceDto) {
    const invoice = DUMMY_INVOICES.find((i) => i.id === id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID "${id}" not found`);
    }
    this.logger.log(`Updating invoice: ${id}`);
    return {
      success: true,
      message: 'Invoice updated successfully',
      data: { ...invoice, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  remove(id: string) {
    const invoice = DUMMY_INVOICES.find((i) => i.id === id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting invoice: ${id}`);
    return {
      success: true,
      message: 'Invoice removed successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
