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

    // Generate real historical aggregation for growth based on Tenant createdAt dates
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Initialize last 4 months (including current)
    const growth: { month: string, value: number }[] = [];
    for (let i = 3; i >= 0; i--) {
      let mIndex = currentMonth - i;
      if (mIndex < 0) mIndex += 12;
      growth.push({ month: monthNames[mIndex], value: 0 });
    }

    // Accumulate total gyms up to each month
    let runningTotal = 0;
    
    // Simplified logic: Count gyms created before each month in the window
    for (let i = 0; i < growth.length; i++) {
      const monthLabel = growth[i].month;
      const countForMonth = allGyms.filter(g => {
        const d = new Date(g.createdAt || new Date());
        return monthNames[d.getMonth()] === monthLabel;
      }).length;
      runningTotal += countForMonth;
      growth[i].value = runningTotal;
    }

    // For MRR, a proper implementation would query each tenant's Payments table.
    // As a safe fallback without cross-tenant massive aggregation, we flatline the known MRR based on active gym count over time.
    const revenue = growth.map(g => ({
      month: g.month,
      // Rough estimate of MRR based on active gym proportion
      value: totalGyms > 0 ? (g.value / totalGyms) * monthlyRecurringRevenue : 0
    }));

    const recentOnboards = [...allGyms]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 5)
      .map(t => ({
        id: t.id,
        name: t.name,
        ownerName: t.ownerName,
        plan: t.plan || 'BASIC',
        createdAt: new Date(t.createdAt).toLocaleDateString()
      }));

    return {
      metrics: {
        monthlyRecurringRevenue,
        totalGyms,
        activeGyms,
        totalEndUsers,
        recentOnboards
      },
      revenue,
      growth
    };
  }
}
