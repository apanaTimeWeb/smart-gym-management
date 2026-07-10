import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  DUMMY_TENANTS,
  DUMMY_DASHBOARD_METRICS,
  REVENUE_CHART_DATA,
  GYM_GROWTH_DATA,
} from '../../superadmin.constants';
import { CreateGymDto } from '../dto/create-gyms.dto';
import { UpdateGymDto } from '../dto/update-gyms.dto';

@Injectable()
export class GymsService {
  private readonly logger = new Logger(GymsService.name);

  create(createDto: CreateGymDto) {
    this.logger.log(`Creating new gym tenant: ${createDto.name}`);
    return {
      success: true,
      message: 'Gym tenant created successfully',
      data: {
        id: `t-${Date.now()}`,
        ...createDto,
        status: createDto.status ?? 'TRIAL',
        plan: createDto.plan ?? 'BASIC',
        memberCount: createDto.memberCount ?? 0,
        monthlyRevenue: createDto.monthlyRevenue ?? 0,
        databaseVersion: createDto.databaseVersion ?? 'v1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  findAll(page: number = 1, limit: number = 20, search: string = '') {
    this.logger.log(`Fetching gym tenants (page: ${page}, limit: ${limit}, search: ${search})`);
    
    let filteredTenants = DUMMY_TENANTS;
    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredTenants = filteredTenants.filter(t => 
        t.name.toLowerCase().includes(lowerSearch) || 
        t.ownerName?.toLowerCase().includes(lowerSearch) ||
        t.adminEmail?.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Manual pagination slice
    const startIndex = (page - 1) * limit;
    const paginatedTenants = filteredTenants.slice(startIndex, startIndex + limit);

    return {
      success: true,
      message: 'Gym tenants fetched successfully',
      data: paginatedTenants,
      meta: {
        total: filteredTenants.length,
        page,
        limit,
      },
    };
  }

  findOne(id: string) {
    const gym = DUMMY_TENANTS.find((t) => t.id === id);
    if (!gym) {
      throw new NotFoundException(`Gym tenant with ID "${id}" not found`);
    }
    return {
      success: true,
      message: 'Gym tenant fetched successfully',
      data: gym,
    };
  }

  update(id: string, updateDto: UpdateGymDto) {
    const gym = DUMMY_TENANTS.find((t) => t.id === id);
    if (!gym) {
      throw new NotFoundException(`Gym tenant with ID "${id}" not found`);
    }
    this.logger.log(`Updating gym tenant: ${id}`);
    return {
      success: true,
      message: 'Gym tenant updated successfully',
      data: { ...gym, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  changeStatus(id: string, status: string) {
    const gym = DUMMY_TENANTS.find((t) => t.id === id);
    if (!gym) {
      throw new NotFoundException(`Gym tenant with ID "${id}" not found`);
    }
    this.logger.log(`Changing status for gym tenant: ${id} to ${status}`);
    return {
      success: true,
      message: `Gym tenant status changed to ${status}`,
      data: { ...gym, status, updatedAt: new Date().toISOString() },
    };
  }

  remove(id: string) {
    const gym = DUMMY_TENANTS.find((t) => t.id === id);
    if (!gym) {
      throw new NotFoundException(`Gym tenant with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting gym tenant: ${id}`);
    // Soft delete — sets is_deleted flag (Rule 29)
    return {
      success: true,
      message: 'Gym tenant suspended and soft-deleted successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }

  /** Returns aggregated tenant statistics for the dashboard */
  getStats() {
    return {
      success: true,
      message: 'Gym statistics fetched successfully',
      data: {
        ...DUMMY_DASHBOARD_METRICS,
        revenueChartData: REVENUE_CHART_DATA,
        gymGrowthData: GYM_GROWTH_DATA,
      },
    };
  }
}
