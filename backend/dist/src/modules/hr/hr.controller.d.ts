import { HrService } from './hr.service';
export declare class HrController {
    private readonly hrService;
    constructor(hrService: HrService);
    findAllStaff(query: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            email: string;
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
        }[];
    }>;
    createStaff(dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            email: string;
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
    }>;
    findOneStaff(id: string): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            email: string;
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
        } | null;
    }>;
    updateStaff(id: string, dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            email: string;
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
    }>;
    removeStaff(id: string): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            email: string;
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
    }>;
    findAllPayrolls(query: any): Promise<{
        success: boolean;
        data: ({
            staff: {
                id: number;
                name: string;
                email: string;
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
            staffId: number;
            month: string;
        })[];
    }>;
    createPayroll(dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            status: string;
            amount: number;
            notes: string | null;
            paidAt: Date | null;
            staffId: number;
            month: string;
        };
    }>;
    updatePayrollStatus(id: string, body: any): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            status: string;
            amount: number;
            notes: string | null;
            paidAt: Date | null;
            staffId: number;
            month: string;
        };
    }>;
    getHrSummary(): Promise<{
        success: boolean;
        data: {
            totalStaff: number;
            activeStaff: number;
            totalPayrollThisMonth: number;
            paidCount: number;
            pendingCount: number;
        };
    }>;
}
