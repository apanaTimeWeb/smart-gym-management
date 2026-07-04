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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let MembersService = class MembersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const cycleMonths = {
            ONE_MONTH: 1,
            THREE_MONTHS: 3,
            SIX_MONTHS: 6,
            TWELVE_MONTHS: 12,
        };
        const joinDate = dto.joinDate ? new Date(dto.joinDate) : new Date();
        const expiryDate = new Date(joinDate);
        expiryDate.setMonth(expiryDate.getMonth() + (cycleMonths[dto.billingCycle] || 1));
        const member = await this.prisma.member.create({
            data: {
                ...dto,
                joinDate,
                expiryDate,
                status: 'ACTIVE',
                paidAmount: 0,
                pendingAmount: 0,
            },
        });
        return member;
    }
    async findAll(query) {
        const limit = query.limit ? parseInt(query.limit) : 50;
        const members = await this.prisma.member.findMany({
            include: { plan: true },
            take: limit,
            orderBy: { id: 'desc' },
        });
        return { members, total: members.length };
    }
    async findOne(id) {
        return this.prisma.member.findUnique({
            where: { id },
            include: { plan: true, payments: true },
        });
    }
    async update(id, dto) {
        return this.prisma.member.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        return this.prisma.member.delete({ where: { id } });
    }
    async renewMembership(id, dto) {
        return this.prisma.member.update({
            where: { id },
            data: { status: 'ACTIVE' },
        });
    }
    async getStats() {
        const total = await this.prisma.member.count();
        const active = await this.prisma.member.count({
            where: { status: 'ACTIVE' },
        });
        const pending = await this.prisma.member.count({
            where: { status: 'PENDING' },
        });
        const expired = await this.prisma.member.count({
            where: { status: 'EXPIRED' },
        });
        return { total, active, pending, expired };
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembersService);
//# sourceMappingURL=members.service.js.map