import { DUMMY_INVOICES, DUMMY_TENANTS } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoices.dto';
import { UpdateInvoiceDto } from '../dto/update-invoices.dto';

@Injectable()
export class InvoicesService {
  create(createDto: CreateInvoiceDto) {
    return { success: true, message: 'This action adds a new invoices' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: { invoices: DUMMY_INVOICES, tenants: DUMMY_TENANTS } };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} invoices` };
  }

  update(id: string, updateDto: UpdateInvoiceDto) {
    return { success: true, message: `This action updates a #${id} invoices` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} invoices` };
  }
}
