import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    markAttendance(dto: any): import("@prisma/client").Prisma.Prisma__AttendanceClient<{
        id: number;
        createdAt: Date;
        memberId: number | null;
        type: import("@prisma/client").$Enums.AttendanceType;
        staffId: number | null;
        date: Date;
        checkIn: Date | null;
        checkOut: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(query: any): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        memberId: number | null;
        type: import("@prisma/client").$Enums.AttendanceType;
        staffId: number | null;
        date: Date;
        checkIn: Date | null;
        checkOut: Date | null;
    }[]>;
    getTodayStats(): Promise<{
        totalCheckIns: number;
        memberCheckIns: number;
        staffCheckIns: number;
    }>;
}
