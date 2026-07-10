import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_BROADCASTS } from '../../superadmin.constants';
import { CreateBroadcastDto } from '../dto/create-broadcasts.dto';
import { UpdateBroadcastDto } from '../dto/update-broadcasts.dto';

@Injectable()
export class BroadcastsService {
  private readonly logger = new Logger(BroadcastsService.name);

  create(createDto: CreateBroadcastDto) {
    this.logger.log(`Creating broadcast: ${createDto.title}`);
    return {
      success: true,
      message: 'Broadcast created successfully',
      data: {
        id: `bc-${Date.now()}`,
        ...createDto,
        status: createDto.status ?? 'DRAFT',
        audience: createDto.audience ?? 'ALL_TENANTS',
        scheduledDate: createDto.scheduledDate ?? null,
        sentDate: createDto.sentDate ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all broadcasts');
    return {
      success: true,
      message: 'Broadcasts fetched successfully',
      data: DUMMY_BROADCASTS,
      meta: { total: DUMMY_BROADCASTS.length },
    };
  }

  findOne(id: string) {
    const broadcast = DUMMY_BROADCASTS.find((b) => b.id === id);
    if (!broadcast) {
      throw new NotFoundException(`Broadcast with ID "${id}" not found`);
    }
    return { success: true, message: 'Broadcast fetched successfully', data: broadcast };
  }

  update(id: string, updateDto: UpdateBroadcastDto) {
    const broadcast = DUMMY_BROADCASTS.find((b) => b.id === id);
    if (!broadcast) {
      throw new NotFoundException(`Broadcast with ID "${id}" not found`);
    }
    this.logger.log(`Updating broadcast: ${id}`);
    return {
      success: true,
      message: 'Broadcast updated successfully',
      data: { ...broadcast, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  remove(id: string) {
    const broadcast = DUMMY_BROADCASTS.find((b) => b.id === id);
    if (!broadcast) {
      throw new NotFoundException(`Broadcast with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting broadcast: ${id}`);
    return {
      success: true,
      message: 'Broadcast removed successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
