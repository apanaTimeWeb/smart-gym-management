"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inquiry_entity_1 = require("./entities/inquiry.entity");
const inquiries_repository_1 = require("./inquiries.repository");
const create_inquiry_controller_1 = require("./controllers/create-inquiry.controller");
const find_inquiry_controller_1 = require("./controllers/find-inquiry.controller");
const update_inquiry_controller_1 = require("./controllers/update-inquiry.controller");
const inquiry_stats_controller_1 = require("./controllers/inquiry-stats.controller");
const create_inquiry_service_1 = require("./services/create-inquiry.service");
const find_inquiry_service_1 = require("./services/find-inquiry.service");
const update_inquiry_service_1 = require("./services/update-inquiry.service");
const inquiry_stats_service_1 = require("./services/inquiry-stats.service");
let InquiriesModule = class InquiriesModule {
};
exports.InquiriesModule = InquiriesModule;
exports.InquiriesModule = InquiriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inquiry_entity_1.Inquiry])],
        controllers: [
            create_inquiry_controller_1.CreateInquiryController,
            find_inquiry_controller_1.FindInquiryController,
            update_inquiry_controller_1.UpdateInquiryController,
            inquiry_stats_controller_1.InquiryStatsController,
        ],
        providers: [
            inquiries_repository_1.InquiriesRepository,
            create_inquiry_service_1.CreateInquiryService,
            find_inquiry_service_1.FindInquiryService,
            update_inquiry_service_1.UpdateInquiryService,
            inquiry_stats_service_1.InquiryStatsService,
        ],
    })
], InquiriesModule);
//# sourceMappingURL=inquiries.module.js.map