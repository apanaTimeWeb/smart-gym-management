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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inquiry_entity_1 = require("./entities/inquiry.entity");
let InquiriesService = class InquiriesService {
    inquiryRepository;
    constructor(inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }
    async findAll(query) {
        const limit = query.limit ? parseInt(query.limit) : 200;
        const inquiries = await this.inquiryRepository.find({
            order: { id: 'DESC' },
            take: limit,
        });
        return { success: true, data: { inquiries, total: inquiries.length } };
    }
    async create(dto) {
        const inquiry = this.inquiryRepository.create(dto);
        const data = await this.inquiryRepository.save(inquiry);
        return { success: true, data };
    }
    async findOne(id) {
        const data = await this.inquiryRepository.findOne({ where: { id } });
        return { success: true, data };
    }
    async update(id, dto) {
        await this.inquiryRepository.update(id, dto);
        const data = await this.inquiryRepository.findOne({ where: { id } });
        return { success: true, data };
    }
    async remove(id) {
        const data = await this.inquiryRepository.findOne({ where: { id } });
        if (data) {
            await this.inquiryRepository.delete(id);
        }
        return { success: true, data };
    }
    async getStats() {
        const [total, new_count, followUp, converted, lost] = await Promise.all([
            this.inquiryRepository.count(),
            this.inquiryRepository.count({ where: { status: 'NEW' } }),
            this.inquiryRepository.count({ where: { status: 'FOLLOW_UP' } }),
            this.inquiryRepository.count({ where: { status: 'CONVERTED' } }),
            this.inquiryRepository.count({ where: { status: 'LOST' } }),
        ]);
        return { success: true, data: { total, new: new_count, followUp, converted, lost } };
    }
};
exports.InquiriesService = InquiriesService;
exports.InquiriesService = InquiriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inquiry_entity_1.Inquiry)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InquiriesService);
//# sourceMappingURL=inquiries.service.js.map