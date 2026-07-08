import { PrismaService } from '../../database/prisma.service';
export declare class InquiriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: any): Promise<{
        success: boolean;
        data: {
            inquiries: {
                id: number;
                email: string | null;
                name: string;
                phone: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("@prisma/client").$Enums.InquiryStatus;
                notes: string | null;
                interest: string;
                source: string | null;
                followUpDate: Date | null;
            }[];
            total: number;
        };
    }>;
    create(dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string | null;
            name: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.InquiryStatus;
            notes: string | null;
            interest: string;
            source: string | null;
            followUpDate: Date | null;
        };
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string | null;
            name: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.InquiryStatus;
            notes: string | null;
            interest: string;
            source: string | null;
            followUpDate: Date | null;
        } | null;
    }>;
    update(id: number, dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string | null;
            name: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.InquiryStatus;
            notes: string | null;
            interest: string;
            source: string | null;
            followUpDate: Date | null;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string | null;
            name: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.InquiryStatus;
            notes: string | null;
            interest: string;
            source: string | null;
            followUpDate: Date | null;
        };
    }>;
    getStats(): Promise<{
        success: boolean;
        data: {
            total: number;
            new: number;
            followUp: number;
            converted: number;
            lost: number;
        };
    }>;
}
