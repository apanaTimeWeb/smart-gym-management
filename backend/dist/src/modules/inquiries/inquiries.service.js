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
exports.InquiriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let InquiriesService = class InquiriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(query) {
        return this.prisma.inquiry
            .findMany({ orderBy: { id: 'desc' } })
            .then((inquiries) => ({ inquiries, total: inquiries.length }));
    }
    create(dto) {
        return this.prisma.inquiry.create({ data: dto });
    }
    findOne(id) {
        return this.prisma.inquiry.findUnique({ where: { id } });
    }
    update(id, dto) {
        return this.prisma.inquiry.update({ where: { id }, data: dto });
    }
    remove(id) {
        return this.prisma.inquiry.delete({ where: { id } });
    }
    async getStats() {
        const total = await this.prisma.inquiry.count();
        const new_count = await this.prisma.inquiry.count({
            where: { status: 'NEW' },
        });
        const followUp = await this.prisma.inquiry.count({
            where: { status: 'FOLLOW_UP' },
        });
        const converted = await this.prisma.inquiry.count({
            where: { status: 'CONVERTED' },
        });
        const lost = await this.prisma.inquiry.count({ where: { status: 'LOST' } });
        return { total, new: new_count, followUp, converted, lost };
    }
};
exports.InquiriesService = InquiriesService;
exports.InquiriesService = InquiriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InquiriesService);
//# sourceMappingURL=inquiries.service.js.map