import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_MIGRATIONS, DUMMY_TENANTS } from '../../superadmin.constants';
import { CreateMigrationDto } from '../dto/create-migrations.dto';
import { UpdateMigrationDto } from '../dto/update-migrations.dto';

@Injectable()
export class MigrationsService {
  private readonly logger = new Logger(MigrationsService.name);

  create(createDto: CreateMigrationDto) {
    this.logger.log(`Registering schema migration: ${createDto.name}`);
    return {
      success: true,
      message: 'Schema migration registered successfully',
      data: {
        id: `mig-${Date.now()}`,
        ...createDto,
        appliedAt: createDto.appliedAt ?? null,
        status: createDto.status ?? 'PENDING',
        createdAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all schema migrations');
    return {
      success: true,
      message: 'Schema migrations fetched successfully',
      data: {
        migrations: DUMMY_MIGRATIONS,
        tenants: DUMMY_TENANTS,
      },
      meta: {
        total: DUMMY_MIGRATIONS.length,
        pending: DUMMY_MIGRATIONS.filter((m) => m.status === 'PENDING').length,
        applied: DUMMY_MIGRATIONS.filter((m) => m.status === 'SUCCESS').length,
        failed: DUMMY_MIGRATIONS.filter((m) => m.status === 'FAILED').length,
      },
    };
  }

  findOne(id: string) {
    const migration = DUMMY_MIGRATIONS.find((m) => m.id === id);
    if (!migration) {
      throw new NotFoundException(`Schema migration with ID "${id}" not found`);
    }
    return { success: true, message: 'Schema migration fetched successfully', data: migration };
  }

  update(id: string, updateDto: UpdateMigrationDto) {
    const migration = DUMMY_MIGRATIONS.find((m) => m.id === id);
    if (!migration) {
      throw new NotFoundException(`Schema migration with ID "${id}" not found`);
    }
    this.logger.log(`Updating schema migration: ${id}`);
    return {
      success: true,
      message: 'Schema migration updated successfully',
      data: { ...migration, ...updateDto },
    };
  }

  remove(id: string) {
    const migration = DUMMY_MIGRATIONS.find((m) => m.id === id);
    if (!migration) {
      throw new NotFoundException(`Schema migration with ID "${id}" not found`);
    }
    this.logger.log(`Removing schema migration: ${id}`);
    return {
      success: true,
      message: 'Schema migration record removed',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
