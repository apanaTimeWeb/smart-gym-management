import { PrismaService } from '../../database/prisma.service';
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSettings(): Promise<{
        id: number;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        gymName: string;
        ownerName: string | null;
        city: string | null;
        gstNumber: string | null;
    }>;
    updateSettings(dto: any): Promise<{
        id: number;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        gymName: string;
        ownerName: string | null;
        city: string | null;
        gstNumber: string | null;
    }>;
}
