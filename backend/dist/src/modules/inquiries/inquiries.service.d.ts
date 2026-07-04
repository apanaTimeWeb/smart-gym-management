import { PrismaService } from '../../database/prisma.service';
export declare class InquiriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: any): Promise<{
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
    }>;
    create(dto: any): import("@prisma/client").Prisma.Prisma__InquiryClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__InquiryClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: any): import("@prisma/client").Prisma.Prisma__InquiryClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__InquiryClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getStats(): Promise<{
        total: number;
        new: number;
        followUp: number;
        converted: number;
        lost: number;
    }>;
}
