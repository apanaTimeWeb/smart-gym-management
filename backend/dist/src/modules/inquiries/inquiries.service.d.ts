import { Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';
export declare class InquiriesService {
    private readonly inquiryRepository;
    constructor(inquiryRepository: Repository<Inquiry>);
    findAll(query: any): Promise<{
        success: boolean;
        data: {
            inquiries: Inquiry[];
            total: number;
        };
    }>;
    create(dto: any): Promise<{
        success: boolean;
        data: Inquiry[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        data: Inquiry | null;
    }>;
    update(id: number, dto: any): Promise<{
        success: boolean;
        data: Inquiry | null;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        data: Inquiry | null;
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
