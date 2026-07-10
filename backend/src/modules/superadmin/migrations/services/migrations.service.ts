import { DUMMY_MIGRATIONS, DUMMY_TENANTS } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreateMigrationDto } from '../dto/create-migrations.dto';
import { UpdateMigrationDto } from '../dto/update-migrations.dto';

@Injectable()
export class MigrationsService {
  create(createDto: CreateMigrationDto) {
    return { success: true, message: 'This action adds a new migrations' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: { migrations: DUMMY_MIGRATIONS, tenants: DUMMY_TENANTS } };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} migrations` };
  }

  update(id: string, updateDto: UpdateMigrationDto) {
    return { success: true, message: `This action updates a #${id} migrations` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} migrations` };
  }
}
