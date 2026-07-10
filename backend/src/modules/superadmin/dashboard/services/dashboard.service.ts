import { DUMMY_DASHBOARD_METRICS, REVENUE_CHART_DATA, GYM_GROWTH_DATA } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from '../dto/create-dashboard.dto';
import { UpdateDashboardDto } from '../dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  create(createDto: CreateDashboardDto) {
    return { success: true, message: 'This action adds a new dashboard' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: { metrics: DUMMY_DASHBOARD_METRICS, revenue: REVENUE_CHART_DATA, growth: GYM_GROWTH_DATA } };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} dashboard` };
  }

  update(id: string, updateDto: UpdateDashboardDto) {
    return { success: true, message: `This action updates a #${id} dashboard` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} dashboard` };
  }
}
