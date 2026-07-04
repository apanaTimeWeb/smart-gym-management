import { InquiriesService } from './inquiries.service';
export declare class InquiriesController {
    private readonly inquiriesService;
    constructor(inquiriesService: InquiriesService);
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
    getStats(): Promise<{
        total: number;
        new: number;
        followUp: number;
        converted: number;
        lost: number;
    }>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__InquiryClient<{
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
    update(id: string, dto: any): import("@prisma/client").Prisma.Prisma__InquiryClient<{
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
    remove(id: string): import("@prisma/client").Prisma.Prisma__InquiryClient<{
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
}
