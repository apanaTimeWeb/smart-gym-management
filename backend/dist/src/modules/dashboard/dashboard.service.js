"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const member_entity_1 = require("../members/entities/member.entity");
const payment_entity_1 = require("../finance/entities/payment.entity");
const staff_entity_1 = require("../hr/entities/staff.entity");
const product_entity_1 = require("../store/entities/product.entity");
const inquiry_entity_1 = require("../inquiries/entities/inquiry.entity");
let DashboardService = class DashboardService {
    memberRepository;
    paymentRepository;
    staffRepository;
    productRepository;
    inquiryRepository;
    constructor(memberRepository, paymentRepository, staffRepository, productRepository, inquiryRepository) {
        this.memberRepository = memberRepository;
        this.paymentRepository = paymentRepository;
        this.staffRepository = staffRepository;
        this.productRepository = productRepository;
        this.inquiryRepository = inquiryRepository;
    }
    async getStats() {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        sixMonthsAgo.setHours(0, 0, 0, 0);
        const totalMembers = await this.memberRepository.count();
        const activeMembers = await this.memberRepository.count({ where: { status: 'ACTIVE' } });
        const pendingMembers = await this.memberRepository.count({ where: { status: 'PENDING' } });
        const expiredMembers = await this.memberRepository.count({ where: { status: 'EXPIRED' } });
        const newMembersThisMonth = await this.memberRepository.count({
            where: { joinDate: (0, typeorm_2.MoreThanOrEqual)(firstDayOfMonth) },
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
        const newInquiries = await this.inquiryRepository.count({ where: { status: 'NEW' } });
        const recentMembersForChart = await this.memberRepository.find({
            where: { joinDate: (0, typeorm_2.MoreThanOrEqual)(sixMonthsAgo) },
            select: ['joinDate'],
        });
        const recentPaymentsForChart = await this.paymentRepository.find({
            where: { status: 'PAID', paidAt: (0, typeorm_2.MoreThanOrEqual)(sixMonthsAgo) },
            select: ['paidAt', 'amount'],
        });
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const memberGrowthMap = new Map();
        const revenueMap = new Map();
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(now.getMonth() - i);
            const mName = monthNames[d.getMonth()];
            memberGrowthMap.set(mName, 0);
            revenueMap.set(mName, 0);
        }
        recentMembersForChart.forEach((m) => {
            const mName = monthNames[m.joinDate.getMonth()];
            if (memberGrowthMap.has(mName))
                memberGrowthMap.set(mName, memberGrowthMap.get(mName) + 1);
        });
        recentPaymentsForChart.forEach((p) => {
            if (p.paidAt) {
                const mName = monthNames[p.paidAt.getMonth()];
                if (revenueMap.has(mName))
                    revenueMap.set(mName, revenueMap.get(mName) + p.amount);
            }
        });
        const memberGrowth = Array.from(memberGrowthMap.entries()).map(([month, count]) => ({ month, count }));
        const revenueChart = Array.from(revenueMap.entries()).map(([month, revenue]) => ({ month, revenue }));
        const membersWithPlans = await this.memberRepository.find({ relations: ['plan'] });
        const planCounts = new Map();
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(2, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(4, (0, typeorm_1.InjectRepository)(inquiry_entity_1.Inquiry)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map