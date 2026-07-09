import { Repository } from 'typeorm';
import { Member } from "../members/entities/member.entity";
import { Payment } from "../finance/entities/payment.entity";
import { Staff } from "../hr/entities/staff.entity";
import { Product } from "../store/entities/product.entity";
import { Inquiry } from "../inquiries/entities/inquiry.entity";
export declare class DashboardService {
    private readonly memberRepository;
    private readonly paymentRepository;
    private readonly staffRepository;
    private readonly productRepository;
    private readonly inquiryRepository;
    constructor(memberRepository: Repository<Member>, paymentRepository: Repository<Payment>, staffRepository: Repository<Staff>, productRepository: Repository<Product>, inquiryRepository: Repository<Inquiry>);
    getStats(): Promise<{
        success: boolean;
        data: {
            totalMembers: number;
            activeMembers: number;
            newMembersThisMonth: number;
            totalRevenue: number;
            monthlyRevenue: number;
            pendingPayments: number;
            totalStaff: number;
            activeStaff: number;
            totalProducts: number;
            lowStockCount: number;
            totalInquiries: number;
            newInquiries: number;
            memberGrowth: {
                month: string;
                count: number;
            }[];
            revenueChart: {
                month: string;
                revenue: number;
            }[];
            membersByPlan: {
                plan: string;
                count: number;
            }[];
            membersByStatus: {
                active: number;
                pending: number;
                expired: number;
            };
            recentMembers: Member[];
            recentPayments: Payment[];
            pendingPaymentsList: Member[];
        };
    }>;
}
