"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const member_entity_1 = require("../members/entities/member.entity");
const finance_repository_1 = require("./finance.repository");
const payment_service_1 = require("./services/payment.service");
const finance_summary_service_1 = require("./services/finance-summary.service");
const member_registered_listener_1 = require("./listeners/member-registered.listener");
const payment_controller_1 = require("./controllers/payment.controller");
const finance_summary_controller_1 = require("./controllers/finance-summary.controller");
let FinanceModule = class FinanceModule {
};
exports.FinanceModule = FinanceModule;
exports.FinanceModule = FinanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([payment_entity_1.Payment, member_entity_1.Member])],
        controllers: [
            payment_controller_1.PaymentController,
            finance_summary_controller_1.FinanceSummaryController,
        ],
        providers: [
            finance_repository_1.FinanceRepository,
            payment_service_1.PaymentService,
            finance_summary_service_1.FinanceSummaryService,
            member_registered_listener_1.MemberRegisteredListener,
        ],
    })
], FinanceModule);
//# sourceMappingURL=finance.module.js.map