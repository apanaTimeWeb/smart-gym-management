import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_AFFILIATES } from '../../superadmin.constants';
import { CreateAffiliateDto } from '../dto/create-affiliates.dto';
import { UpdateAffiliateDto } from '../dto/update-affiliates.dto';

@Injectable()
export class AffiliatesService {
  private readonly logger = new Logger(AffiliatesService.name);

  create(createDto: CreateAffiliateDto) {
    this.logger.log(`Creating affiliate partner: ${createDto.name}`);
    return {
      success: true,
      message: 'Affiliate partner created successfully',
      data: {
        id: `aff-${Date.now()}`,
        ...createDto,
        totalReferred: createDto.totalReferred ?? 0,
        commissionEarned: createDto.commissionEarned ?? 0,
        status: createDto.status ?? 'ACTIVE',
        joinedAt: createDto.joinedAt ?? new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all affiliate partners');
    return {
      success: true,
      message: 'Affiliate partners fetched successfully',
      data: DUMMY_AFFILIATES,
      meta: { total: DUMMY_AFFILIATES.length },
    };
  }

  findOne(id: string) {
    const affiliate = DUMMY_AFFILIATES.find((a) => a.id === id);
    if (!affiliate) {
      throw new NotFoundException(`Affiliate partner with ID "${id}" not found`);
    }
    return { success: true, message: 'Affiliate partner fetched successfully', data: affiliate };
  }

  update(id: string, updateDto: UpdateAffiliateDto) {
    const affiliate = DUMMY_AFFILIATES.find((a) => a.id === id);
    if (!affiliate) {
      throw new NotFoundException(`Affiliate partner with ID "${id}" not found`);
    }
    this.logger.log(`Updating affiliate partner: ${id}`);
    return {
      success: true,
      message: 'Affiliate partner updated successfully',
      data: { ...affiliate, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  remove(id: string) {
    const affiliate = DUMMY_AFFILIATES.find((a) => a.id === id);
    if (!affiliate) {
      throw new NotFoundException(`Affiliate partner with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting affiliate partner: ${id}`);
    return {
      success: true,
      message: 'Affiliate partner deactivated and archived',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
