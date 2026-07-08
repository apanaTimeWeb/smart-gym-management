import { PrismaService } from '../../database/prisma.service';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    markAttendance(dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            memberId: number | null;
            staffId: number | null;
            date: Date;
            checkIn: Date | null;
            checkOut: Date | null;
            type: import("@prisma/client").$Enums.AttendanceType;
        };
    }>;
    findAll(query: any): Promise<{
        success: boolean;
        data: ({
            staff: {
                name: string;
            } | null;
            member: {
                name: string;
            } | null;
        } & {
            id: number;
            createdAt: Date;
            memberId: number | null;
            staffId: number | null;
            date: Date;
            checkIn: Date | null;
            checkOut: Date | null;
            type: import("@prisma/client").$Enums.AttendanceType;
        })[];
    }>;
    getTodayStats(): Promise<{
        success: boolean;
        data: {
            totalCheckIns: number;
            memberCheckIns: number;
            staffCheckIns: number;
        };
    }>;
}
