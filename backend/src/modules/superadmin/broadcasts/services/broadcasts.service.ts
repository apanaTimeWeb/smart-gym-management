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

  findAll(page: number = 1, limit: number = 20, search: string = '') {
    this.logger.log(`Fetching broadcasts (page: ${page}, limit: ${limit}, search: ${search})`);
    
    let filteredBroadcasts = DUMMY_BROADCASTS;
    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredBroadcasts = filteredBroadcasts.filter(b => 
        b.title.toLowerCase().includes(lowerSearch) || 
        b.content.toLowerCase().includes(lowerSearch)
      );
    }
    
    const startIndex = (page - 1) * limit;
    const paginatedBroadcasts = filteredBroadcasts.slice(startIndex, startIndex + limit);

    return {
      success: true,
      message: 'Broadcasts fetched successfully',
      data: paginatedBroadcasts,
      meta: { 
        total: filteredBroadcasts.length,
        page,
        limit,
      },
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

  sendBroadcast(id: string) {
    const broadcast = DUMMY_BROADCASTS.find((b) => b.id === id);
    if (!broadcast) {
      throw new NotFoundException(`Broadcast with ID "${id}" not found`);
    }
    this.logger.log(`Sending broadcast: ${id}`);
    return {
      success: true,
      message: 'Broadcast dispatched successfully',
      data: { ...broadcast, status: 'SENT', sentDate: new Date().toISOString(), updatedAt: new Date().toISOString() },
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
