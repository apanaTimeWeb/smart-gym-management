import { Injectable, Inject } from '@nestjs/common';

import { Repository, DataSource , MoreThanOrEqual } from 'typeorm';

import { Member } from '@/modules/erp/members/entities/member.entity';
import { Payment } from '@/modules/erp/finance/entities/payment.entity';
import { Staff } from '@/modules/erp/hr/entities/staff.entity';
import { Product } from '@/modules/erp/store/entities/product.entity';
import { Inquiry } from '@/modules/erp/inquiries/entities/inquiry.entity';

@Injectable()
export class DashboardRepository {
    public readonly memberRepo: Repository<Member>;
  public readonly paymentRepo: Repository<Payment>;
  public readonly staffRepo: Repository<Staff>;
  public readonly productRepo: Repository<Product>;
  public readonly inquiryRepo: Repository<Inquiry>;

    public readonly memberRepository: Repository<Member>;
  public readonly paymentRepository: Repository<Payment>;
  public readonly staffRepository: Repository<Staff>;
  public readonly productRepository: Repository<Product>;
  public readonly inquiryRepository: Repository<Inquiry>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.memberRepository = this.dataSource.getRepository(Member);
    this.paymentRepository = this.dataSource.getRepository(Payment);
    this.staffRepository = this.dataSource.getRepository(Staff);
    this.productRepository = this.dataSource.getRepository(Product);
    this.inquiryRepository = this.dataSource.getRepository(Inquiry);
  }

  // ─── KPI Queries ──────────────────────────────────────────────────────────
  async getMemberCounts() {
    const total = await this.memberRepository.count();
    const active = await this.memberRepository.count({
      where: { status: 'ACTIVE' as any },
    });
    const pending = await this.memberRepository.count({
      where: { status: 'PENDING' as any },
    });
    const expired = await this.memberRepository.count({
      where: { status: 'EXPIRED' as any },
    });
    return { total, active, pending, expired };
  }

  async getNewMembersThisMonth(firstDayOfMonth: Date) {
    return this.memberRepository.count({
      where: { joinDate: MoreThanOrEqual(firstDayOfMonth) },
    });
  }

  async getRevenueStats(firstDayOfMonth: Date) {
    const { totalRevenue } = (await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'totalRevenue')
      .where('payment.status = :status', { status: 'PAID' })
      .getRawOne()) || {};

    const { monthlyRevenue } = (await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'monthlyRevenue')
      .where('payment.status = :status', { status: 'PAID' })
      .andWhere('payment.paidAt >= :firstDayOfMonth', { firstDayOfMonth })
      .getRawOne()) || {};

    const { pendingPayments } = (await this.memberRepository
      .createQueryBuilder('member')
      .select('SUM(member.pendingAmount)', 'pendingPayments')
      .getRawOne()) || {};

    return {
      totalRevenue: parseFloat(totalRevenue) || 0,
      monthlyRevenue: parseFloat(monthlyRevenue) || 0,
      pendingPayments: parseFloat(pendingPayments) || 0,
    };
  }

  async getStaffStats() {
    const total = await this.staffRepository.count();
    const active = await this.staffRepository.count({
      where: { isActive: true },
    });
    return { total, active };
  }

  async getProductStats() {
    const total = await this.productRepository.count();
    const allProducts = await this.productRepository.find(); // Not ideal, but keeping original logic structure
    const lowStockCount = allProducts.filter((p) => p.stock <= 10).length;
    return { total, lowStockCount };
  }

  async getInquiryStats() {
    const total = await this.inquiryRepository.count();
    const newInquiries = await this.inquiryRepository.count({
      where: { status: 'NEW' as any },
    });
    return { total, newInquiries };
  }

  // ─── Chart Queries ────────────────────────────────────────────────────────
  async getRecentMembersForChart(sixMonthsAgo: Date) {
    return this.memberRepository.find({
      where: { joinDate: MoreThanOrEqual(sixMonthsAgo) },
      select: ['joinDate'],
    });
  }

  async getRecentPaymentsForChart(sixMonthsAgo: Date) {
    return this.paymentRepository.find({
      where: { status: 'PAID' as any, paidAt: MoreThanOrEqual(sixMonthsAgo) },
      select: ['paidAt', 'amount'],
    });
  }

  async getMembersWithPlans() {
    // Only fetching necessary fields to avoid giant payloads
    return this.memberRepository.find({ relations: ['plan'] });
  }

  // ─── Recent Data Queries ──────────────────────────────────────────────────
  async getRecentMembers() {
    return this.memberRepository.find({
      take: 5,
      order: { id: 'DESC' },
      relations: ['plan'],
    });
  }

  async getRecentPayments() {
    return this.paymentRepository.find({
      take: 5,
      order: { id: 'DESC' },
      relations: ['member'],
    });
  }

  async getPendingPaymentsList() {
    return this.memberRepository
      .createQueryBuilder('member')
      .where('member.pendingAmount > 0')
      .select([
        'member.id',
        'member.name',
        'member.pendingAmount',
        'member.expiryDate',
      ])
      .take(10)
      .getMany();
  }
}
