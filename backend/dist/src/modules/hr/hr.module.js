"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_entity_1 = require("./entities/staff.entity");
const payroll_entity_1 = require("./entities/payroll.entity");
const hr_repository_1 = require("./services/hr.repository");
const staff_service_1 = require("./services/staff.service");
const payroll_service_1 = require("./services/payroll.service");
const hr_stats_service_1 = require("./services/hr-stats.service");
const staff_controller_1 = require("./controllers/staff.controller");
const payroll_controller_1 = require("./controllers/payroll.controller");
const hr_stats_controller_1 = require("./controllers/hr-stats.controller");
let HrModule = class HrModule {
};
exports.HrModule = HrModule;
exports.HrModule = HrModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([staff_entity_1.Staff, payroll_entity_1.Payroll])],
        controllers: [
            staff_controller_1.StaffController,
            payroll_controller_1.PayrollController,
            hr_stats_controller_1.HrStatsController,
        ],
        providers: [
            hr_repository_1.HrRepository,
            staff_service_1.StaffService,
            payroll_service_1.PayrollService,
            hr_stats_service_1.HrStatsService,
        ],
    })
], HrModule);
//# sourceMappingURL=hr.module.js.map