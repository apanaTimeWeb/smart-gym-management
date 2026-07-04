import { HrService } from './hr.service';
export declare class HrController {
    private readonly hrService;
    constructor(hrService: HrService);
    findAllStaff(query: any): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: string;
        branch: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        salary: number;
        gender: import("@prisma/client").$Enums.Gender;
        address: string | null;
        joinDate: Date;
    }[]>;
    createStaff(dto: any): import("@prisma/client").Prisma.Prisma__StaffClient<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: string;
        branch: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        salary: number;
        gender: import("@prisma/client").$Enums.Gender;
        address: string | null;
        joinDate: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOneStaff(id: string): import("@prisma/client").Prisma.Prisma__StaffClient<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: string;
        branch: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        salary: number;
        gender: import("@prisma/client").$Enums.Gender;
        address: string | null;
        joinDate: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateStaff(id: string, dto: any): import("@prisma/client").Prisma.Prisma__StaffClient<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: string;
        branch: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        salary: number;
        gender: import("@prisma/client").$Enums.Gender;
        address: string | null;
        joinDate: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    removeStaff(id: string): import("@prisma/client").Prisma.Prisma__StaffClient<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: string;
        branch: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        salary: number;
        gender: import("@prisma/client").$Enums.Gender;
        address: string | null;
        joinDate: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAllPayrolls(query: any): import("@prisma/client").Prisma.PrismaPromise<({
        staff: {
            id: number;
            email: string;
            name: string;
            phone: string;
            role: string;
            branch: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            salary: number;
            gender: import("@prisma/client").$Enums.Gender;
            address: string | null;
            joinDate: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        status: string;
        amount: number;
        notes: string | null;
        paidAt: Date | null;
        month: string;
        staffId: number;
    })[]>;
    createPayroll(dto: any): import("@prisma/client").Prisma.Prisma__PayrollClient<{
        id: number;
        createdAt: Date;
        status: string;
        amount: number;
        notes: string | null;
        paidAt: Date | null;
        month: string;
        staffId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updatePayrollStatus(id: string, body: any): import("@prisma/client").Prisma.Prisma__PayrollClient<{
        id: number;
        createdAt: Date;
        status: string;
        amount: number;
        notes: string | null;
        paidAt: Date | null;
        month: string;
        staffId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getHrSummary(): Promise<{
        totalStaff: number;
        activeStaff: number;
        totalPayrollThisMonth: number;
        paidCount: number;
        pendingCount: number;
    }>;
}
