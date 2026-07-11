import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../../gyms/entities/gyms.entity';

@Injectable()
export class FindDashboardService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
  ) {}

  async execute() {
    const totalGyms = await this.tenantRepo.count();
    const activeGyms = await this.tenantRepo.count({ where: { status: 'ACTIVE' as any } });
    
    // Sum up members and revenue
    const allGyms = await this.tenantRepo.find();
    let totalEndUsers = 0;
    let monthlyRecurringRevenue = 0;
    
    allGyms.forEach(g => {
      totalEndUsers += Number(g.memberCount) || 0;
      monthlyRecurringRevenue += Number(g.monthlyRevenue) || 0;
    });

    // Mock trend data for charts
    const revenue = [
      { month: 'Jan', value: monthlyRecurringRevenue * 0.7 },
      { month: 'Feb', value: monthlyRecurringRevenue * 0.8 },
      { month: 'Mar', value: monthlyRecurringRevenue * 0.9 },
      { month: 'Apr', value: monthlyRecurringRevenue },
    ];

    const growth = [
      { month: 'Jan', value: Math.max(0, totalGyms - 3) },
      { month: 'Feb', value: Math.max(0, totalGyms - 2) },
      { month: 'Mar', value: Math.max(0, totalGyms - 1) },
      { month: 'Apr', value: totalGyms },
    ];

    return {
      metrics: {
        monthlyRecurringRevenue,
        totalGyms,
        activeGyms,
        totalEndUsers
      },
      revenue,
      growth
    };
  }
}
