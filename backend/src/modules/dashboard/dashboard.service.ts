import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';

import { Member } from '@/modules/members/entities/member.entity';
import { Payment } from '@/modules/finance/entities/payment.entity';
import { Staff } from '@/modules/hr/entities/staff.entity';
import { Product } from '@/modules/store/entities/product.entity';
import { Inquiry } from '@/modules/inquiries/entities/inquiry.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Staff) private readonly staffRepository: Repository<Staff>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Inquiry) private readonly inquiryRepository: Repository<Inquiry>,
  ) {}

  async getStats() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const totalMembers = await this.memberRepository.count();
    const activeMembers = await this.memberRepository.count({ where: { status: 'ACTIVE' as any } });
    const pendingMembers = await this.memberRepository.count({ where: { status: 'PENDING' as any } });
    const expiredMembers = await this.memberRepository.count({ where: { status: 'EXPIRED' as any } });

    const newMembersThisMonth = await this.memberRepository.count({
      where: { joinDate: MoreThanOrEqual(firstDayOfMonth) },
    });

    const { totalRevenue } = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'totalRevenue')
      .where('payment.status = :status', { status: 'PAID' })
      .getRawOne();

    const { monthlyRevenue } = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'monthlyRevenue')
      .where('payment.status = :status', { status: 'PAID' })
      .andWhere('payment.paidAt >= :firstDayOfMonth', { firstDayOfMonth })
      .getRawOne();

    const { pendingPayments } = await this.memberRepository
      .createQueryBuilder('member')
      .select('SUM(member.pendingAmount)', 'pendingPayments')
      .getRawOne();

    const totalStaff = await this.staffRepository.count();
    const activeStaff = await this.staffRepository.count({ where: { isActive: true } });

    const totalProducts = await this.productRepository.count();
    const allProducts = await this.productRepository.find();
    const lowStockCount = allProducts.filter(p => p.stock <= 10).length;

    const totalInquiries = await this.inquiryRepository.count();
    const newInquiries = await this.inquiryRepository.count({ where: { status: 'NEW' as any } });

    const recentMembersForChart = await this.memberRepository.find({
      where: { joinDate: MoreThanOrEqual(sixMonthsAgo) },
      select: ['joinDate'],
    });

    const recentPaymentsForChart = await this.paymentRepository.find({
      where: { status: 'PAID' as any, paidAt: MoreThanOrEqual(sixMonthsAgo) },
      select: ['paidAt', 'amount'],
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const memberGrowthMap = new Map<string, number>();
    const revenueMap = new Map<string, number>();

    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(now.getMonth() - i);
      const mName = monthNames[d.getMonth()];
      memberGrowthMap.set(mName, 0);
      revenueMap.set(mName, 0);
    }

    recentMembersForChart.forEach((m) => {
      const mName = monthNames[m.joinDate.getMonth()];
      if (memberGrowthMap.has(mName)) memberGrowthMap.set(mName, memberGrowthMap.get(mName)! + 1);
    });

    recentPaymentsForChart.forEach((p) => {
      if (p.paidAt) {
        const mName = monthNames[p.paidAt.getMonth()];
        if (revenueMap.has(mName)) revenueMap.set(mName, revenueMap.get(mName)! + p.amount);
      }
    });

    const memberGrowth = Array.from(memberGrowthMap.entries()).map(([month, count]) => ({ month, count }));
    const revenueChart = Array.from(revenueMap.entries()).map(([month, revenue]) => ({ month, revenue }));

    const membersWithPlans = await this.memberRepository.find({ relations: ['plan'] });
    const planCounts = new Map<string, number>();
    membersWithPlans.forEach((m) => {
      const pName = m.plan?.name || 'Unknown';
      planCounts.set(pName, (planCounts.get(pName) || 0) + 1);
    });
    const membersByPlan = Array.from(planCounts.entries()).map(([plan, count]) => ({ plan, count }));

    const pendingPaymentsListResult = await this.memberRepository
      .createQueryBuilder('member')
      .where('member.pendingAmount > 0')
      .select(['member.id', 'member.name', 'member.pendingAmount', 'member.expiryDate'])
      .take(10)
      .getMany();

    return {
      success: true,
      data: {
        totalMembers,
        activeMembers,
        newMembersThisMonth,
        totalRevenue: parseFloat(totalRevenue) || 0,
        monthlyRevenue: parseFloat(monthlyRevenue) || 0,
        pendingPayments: parseFloat(pendingPayments) || 0,
        totalStaff,
        activeStaff,
        totalProducts,
        lowStockCount,
        totalInquiries,
        newInquiries,
        memberGrowth,
        revenueChart,
        membersByPlan,
        membersByStatus: { active: activeMembers, pending: pendingMembers, expired: expiredMembers },
        recentMembers: await this.memberRepository.find({ take: 5, order: { id: 'DESC' }, relations: ['plan'] }),
        recentPayments: await this.paymentRepository.find({ take: 5, order: { id: 'DESC' }, relations: ['member'] }),
        pendingPaymentsList: pendingPaymentsListResult,
      },
    };
  }
}
