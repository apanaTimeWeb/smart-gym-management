"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plan_entity_1 = require("./entities/plan.entity");
const plans_repository_1 = require("./services/plans.repository");
const create_plan_service_1 = require("./services/create-plan.service");
const find_plan_service_1 = require("./services/find-plan.service");
const update_plan_service_1 = require("./services/update-plan.service");
const create_plan_controller_1 = require("./controllers/create-plan.controller");
const find_plan_controller_1 = require("./controllers/find-plan.controller");
const update_plan_controller_1 = require("./controllers/update-plan.controller");
let PlansModule = class PlansModule {
};
exports.PlansModule = PlansModule;
exports.PlansModule = PlansModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([plan_entity_1.Plan])],
        controllers: [
            create_plan_controller_1.CreatePlanController,
            find_plan_controller_1.FindPlanController,
            update_plan_controller_1.UpdatePlanController,
        ],
        providers: [
            plans_repository_1.PlansRepository,
            create_plan_service_1.CreatePlanService,
            find_plan_service_1.FindPlanService,
            update_plan_service_1.UpdatePlanService,
        ],
    })
], PlansModule);
//# sourceMappingURL=plans.module.js.map