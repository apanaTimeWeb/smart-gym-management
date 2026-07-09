"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const member_entity_1 = require("../members/entities/member.entity");
const payment_entity_1 = require("../finance/entities/payment.entity");
const staff_entity_1 = require("../hr/entities/staff.entity");
const product_entity_1 = require("../store/entities/product.entity");
const inquiry_entity_1 = require("../inquiries/entities/inquiry.entity");
const dashboard_repository_1 = require("./dashboard.repository");
const dashboard_kpi_controller_1 = require("./controllers/dashboard-kpi.controller");
const dashboard_charts_controller_1 = require("./controllers/dashboard-charts.controller");
const dashboard_recent_controller_1 = require("./controllers/dashboard-recent.controller");
const dashboard_kpi_service_1 = require("./services/dashboard-kpi.service");
const dashboard_charts_service_1 = require("./services/dashboard-charts.service");
const dashboard_recent_service_1 = require("./services/dashboard-recent.service");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member, payment_entity_1.Payment, staff_entity_1.Staff, product_entity_1.Product, inquiry_entity_1.Inquiry]),
        ],
        controllers: [
            dashboard_kpi_controller_1.DashboardKpiController,
            dashboard_charts_controller_1.DashboardChartsController,
            dashboard_recent_controller_1.DashboardRecentController,
        ],
        providers: [
            dashboard_repository_1.DashboardRepository,
            dashboard_kpi_service_1.DashboardKpiService,
            dashboard_charts_service_1.DashboardChartsService,
            dashboard_recent_service_1.DashboardRecentService,
        ],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map