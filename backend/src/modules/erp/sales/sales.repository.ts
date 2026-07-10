import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ILike } from 'typeorm';
import { Member } from '@/modules/erp/members/entities/member.entity';
import { Payment } from '@/modules/erp/finance/entities/payment.entity';
import { Plan } from '@/modules/erp/plans/entities/plan.entity';
import { FindSalesDto } from '@/modules/erp/sales/dto/find-sales.dto';

@Injectable()
export class SalesRepository {
  constructor(
    @InjectRepository(Member) private readonly memberRepo: Repository<Member>,
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Plan) private readonly planRepo: Repository<Plan>,
    private readonly dataSource: DataSource,
  ) {}

  async getMonthlyOverview() {
    // Basic implementation: fetch all payments and group by month locally for simplicity, 
    // or use query builder.
    const payments = await this.paymentRepo.find({ select: ['amount', 'paidAt'] });
    const members = await this.memberRepo.find({ select: ['joinDate'] });

    const monthlyMap = new Map<string, { revenue: number; newMembers: number }>();

    const getMonthStr = (d: Date) => d.toLocaleString('en-US', { month: 'short', year: 'numeric' });

    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      monthlyMap.set(getMonthStr(d), { revenue: 0, newMembers: 0 });
    }

    for (const p of payments) {
      const m = getMonthStr(p.paidAt);
      if (monthlyMap.has(m)) {
        monthlyMap.get(m)!.revenue += p.amount;
      }
    }

    for (const mem of members) {
      const m = getMonthStr(mem.joinDate);
      if (monthlyMap.has(m)) {
        monthlyMap.get(m)!.newMembers += 1;
      }
    }

    return Array.from(monthlyMap.entries()).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      newMembers: data.newMembers,
    }));
  }

  async getMembershipReport() {
    const plans = await this.planRepo.find();
    const members = await this.memberRepo.find({ relations: ['plan'] });

    let totalReceivable = 0;
    let totalReceived = 0;
    let totalRemaining = 0;

    const report = plans.map(plan => {
      const planMembers = members.filter(m => m.planId === plan.id);
      const memberCount = planMembers.length;
      const planReceivable = planMembers.reduce((sum, m) => sum + (m.paidAmount + m.pendingAmount), 0);
      const planReceived = planMembers.reduce((sum, m) => sum + m.paidAmount, 0);
      const planRemaining = planMembers.reduce((sum, m) => sum + m.pendingAmount, 0);

      totalReceivable += planReceivable;
      totalReceived += planReceived;
      totalRemaining += planRemaining;

      return {
        plan: plan.name,
        totalReceivable: planReceivable,
        totalReceived: planReceived,
        remaining: planRemaining,
        refunds: 0,
        memberCount
      };
    });

    return {
      report,
      totals: {
        totalReceivable,
        totalReceived,
        remaining: totalRemaining,
        refunds: 0
      }
    };
  }

  async getPendingPayments(query: FindSalesDto) {
    const limit = query.limit || 10;
    const offset = query.offset || 0;
    
    const where: any = {};
    if (query.search) {
      where.name = ILike(`%${query.search}%`);
    }

    const qb = this.memberRepo.createQueryBuilder('member')
      .leftJoinAndSelect('member.plan', 'plan')
      .where('member.pendingAmount > 0');

    if (query.search) {
      qb.andWhere('member.name ILIKE :search', { search: `%${query.search}%` });
    }

    const [members, total] = await qb
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    const formatted = members.map(m => {
      const diffTime = Math.abs(new Date().getTime() - m.expiryDate.getTime());
      const daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return {
        id: m.id,
        name: m.name,
        plan: m.plan?.name || 'No Plan',
        pendingAmount: m.pendingAmount,
        daysOverdue: m.expiryDate < new Date() ? daysOverdue : 0,
        expiryDate: m.expiryDate
      };
    });

    return { members: formatted, total };
  }

  async getAllMemberships(query: FindSalesDto) {
    const limit = query.limit || 10;
    const offset = query.offset || 0;
    
    const qb = this.memberRepo.createQueryBuilder('member')
      .leftJoinAndSelect('member.plan', 'plan');

    if (query.search) {
      qb.andWhere('member.name ILIKE :search', { search: `%${query.search}%` });
    }
    if (query.status) {
      qb.andWhere('member.status = :status', { status: query.status });
    }

    const [members, total] = await qb
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    const formatted = members.map(m => {
      const diffTime = m.expiryDate.getTime() - new Date().getTime();
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return {
        id: m.id,
        name: m.name,
        plan: m.plan?.name || 'No Plan',
        joinDate: m.joinDate,
        expiryDate: m.expiryDate,
        status: m.status,
        paidAmount: m.paidAmount,
        daysLeft: Math.max(0, daysLeft)
      };
    });

    return { members: formatted, total };
  }
}
