"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let HrService = class HrService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAllStaff(query) {
        return this.prisma.staff.findMany({ where: { isActive: true } });
    }
    createStaff(dto) {
        return this.prisma.staff.create({ data: dto });
    }
    findOneStaff(id) {
        return this.prisma.staff.findUnique({ where: { id } });
    }
    updateStaff(id, dto) {
        return this.prisma.staff.update({ where: { id }, data: dto });
    }
    removeStaff(id) {
        return this.prisma.staff.update({
            where: { id },
            data: { isActive: false },
        });
    }
    findAllPayrolls(query) {
        return this.prisma.payroll.findMany({ include: { staff: true } });
    }
    createPayroll(dto) {
        return this.prisma.payroll.create({ data: dto });
    }
    updatePayrollStatus(id, status) {
        return this.prisma.payroll.update({
            where: { id },
            data: { status, paidAt: status === 'Paid' ? new Date() : null },
        });
    }
    async getHrSummary() {
        const totalStaff = await this.prisma.staff.count();
        const activeStaff = await this.prisma.staff.count({
            where: { isActive: true },
        });
        const now = new Date();
        const currentMonth = now.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
        });
        const payrolls = await this.prisma.payroll.findMany();
        let totalPayrollThisMonth = 0;
        let paidCount = 0;
        let pendingCount = 0;
        payrolls.forEach((p) => {
            if (p.status === 'Paid') {
                paidCount++;
                totalPayrollThisMonth += p.amount;
            }
            else {
                pendingCount++;
            }
        });
        return {
            totalStaff,
            activeStaff,
            totalPayrollThisMonth,
            paidCount,
            pendingCount,
        };
    }
};
exports.HrService = HrService;
exports.HrService = HrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HrService);
//# sourceMappingURL=hr.service.js.map