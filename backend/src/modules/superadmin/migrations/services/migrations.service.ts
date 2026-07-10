import { Injectable } from '@nestjs/common';
import { CreateMigrationDto } from '../dto/create-migrations.dto';
import { UpdateMigrationDto } from '../dto/update-migrations.dto';

@Injectable()
export class MigrationsService {
  create(createDto: CreateMigrationDto) {
    return { success: true, message: 'This action adds a new migrations' };
  }

  findAll() {
    return { success: true, message: 'This action returns all migrations' };
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
