import { InquiriesService } from './inquiries.service';
export declare class InquiriesController {
    private readonly inquiriesService;
    constructor(inquiriesService: InquiriesService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: any): Promise<{
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
    remove(id: string): Promise<{
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
}
