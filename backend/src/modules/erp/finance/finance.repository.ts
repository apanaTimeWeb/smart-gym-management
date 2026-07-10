import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ILike } from 'typeorm';
import { FindPaymentDto } from '@/modules/erp/finance/dto/find-payment.dto';
import { Payment } from '@/modules/erp/finance/entities/payment.entity';
import { Member } from '@/modules/erp/members/entities/member.entity';
import { PaymentStatus } from '@/modules/erp/finance/utils/finance.enums';
import { CreatePaymentDto } from '@/modules/erp/finance/dto/create-payment.dto';

@Injectable()
export class FinanceRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    private readonly dataSource: DataSource,
  ) {}

  async findMemberById(id: string): Promise<Member | null> {
    return this.memberRepo.findOne({ where: { id } });
  }

  async processPayment(dto: CreatePaymentDto): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Create Payment
      const payment = queryRunner.manager.create(Payment, {
        memberId: dto.memberId,
        amount: dto.amount,
        method: dto.method,
        notes: dto.notes,
        status: PaymentStatus.PAID,
        invoiceNo: 'INV-' + Date.now(),
        paidAt: new Date(),
      });
      await queryRunner.manager.save(payment);

      // 2. Update Member balances
      await queryRunner.manager
        .createQueryBuilder()
        .update(Member)
        .set({
          paidAmount: () => `paidAmount + ${dto.amount}`,
          pendingAmount: () => `pendingAmount - ${dto.amount}`,
        })
        .where('id = :id', { id: dto.memberId })
        .execute();

      await queryRunner.commitTransaction();
      return payment;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findPayments(query: FindPaymentDto): Promise<[Payment[], number]> {
    const where: any = {};
    if (query.search) {
      where.invoiceNo = ILike(`%${query.search}%`);
      // We can also search by member name but since it's a relation it requires QueryBuilder.
      // For simplicity, let's just search invoiceNo using findAndCount.
    }

    return this.paymentRepo.findAndCount({
      where,
      relations: ['member', 'member.plan'],
      take: query.limit,
      skip: query.offset,
      order: { paidAt: 'DESC' },
    });
  }

  async findPaymentsByMember(memberId: string): Promise<Payment[]> {
    return this.paymentRepo.find({
      where: { memberId },
      order: { paidAt: 'DESC' },
    });
  }

  // --- AGGREGATIONS FOR DASHBOARD ---

  async getTotalRevenue(): Promise<number> {
    const result = await this.paymentRepo
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .where('payment.status = :status', { status: PaymentStatus.PAID })
      .getRawOne();
    return result?.total ? parseFloat(result.total) : 0;
  }

  async getTotalPaymentsCount(): Promise<number> {
    return this.paymentRepo.count();
  }

  async getTotalPendingAmount(): Promise<number> {
    const result = await this.memberRepo
      .createQueryBuilder('member')
      .select('SUM(member.pendingAmount)', 'total')
      .getRawOne();
    return result?.total ? parseFloat(result.total) : 0;
  }

  async getRevenueByMethod(): Promise<{ method: string; total: number }[]> {
    const results = await this.paymentRepo
      .createQueryBuilder('payment')
      .select('payment.method', 'method')
      .addSelect('SUM(payment.amount)', 'total')
      .where('payment.status = :status', { status: PaymentStatus.PAID })
      .groupBy('payment.method')
      .getRawMany();

    return results.map((r) => ({
      method: r.method,
      total: parseFloat(r.total),
    }));
  }

  async getMonthlyRevenue(firstDayOfMonth: Date): Promise<number> {
    const result = await this.paymentRepo
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .where('payment.status = :status', { status: PaymentStatus.PAID })
      .andWhere('payment.paidAt >= :date', { date: firstDayOfMonth })
      .getRawOne();
    return result?.total ? parseFloat(result.total) : 0;
  }

  async getRecentPaymentsForChart(
    sixMonthsAgo: Date,
  ): Promise<{ paidAt: Date; amount: number }[]> {
    return this.paymentRepo
      .createQueryBuilder('payment')
      .select(['payment.paidAt', 'payment.amount'])
      .where('payment.status = :status', { status: PaymentStatus.PAID })
      .andWhere('payment.paidAt >= :date', { date: sixMonthsAgo })
      .getMany();
  }
}
