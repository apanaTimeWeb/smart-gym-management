import { InquiriesService } from "./inquiries.service";
export declare class InquiriesController {
    private readonly inquiriesService;
    constructor(inquiriesService: InquiriesService);
    findAll(query: any): Promise<{
        success: boolean;
        data: {
            inquiries: import("./entities/inquiry.entity").Inquiry[];
            total: number;
        };
    }>;
    create(dto: any): Promise<{
        success: boolean;
        data: import("./entities/inquiry.entity").Inquiry[];
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
        data: import("./entities/inquiry.entity").Inquiry | null;
    }>;
    update(id: string, dto: any): Promise<{
        success: boolean;
        data: import("./entities/inquiry.entity").Inquiry | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        data: import("./entities/inquiry.entity").Inquiry | null;
    }>;
}
