"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const workout_entity_1 = require("./entities/workout.entity");
const diet_plan_entity_1 = require("./entities/diet-plan.entity");
const workout_repository_1 = require("./workout.repository");
const create_workout_controller_1 = require("./controllers/create-workout.controller");
const find_workout_controller_1 = require("./controllers/find-workout.controller");
const update_workout_controller_1 = require("./controllers/update-workout.controller");
const create_diet_plan_controller_1 = require("./controllers/create-diet-plan.controller");
const find_diet_plan_controller_1 = require("./controllers/find-diet-plan.controller");
const update_diet_plan_controller_1 = require("./controllers/update-diet-plan.controller");
const create_workout_service_1 = require("./services/create-workout.service");
const find_workout_service_1 = require("./services/find-workout.service");
const update_workout_service_1 = require("./services/update-workout.service");
const create_diet_plan_service_1 = require("./services/create-diet-plan.service");
const find_diet_plan_service_1 = require("./services/find-diet-plan.service");
const update_diet_plan_service_1 = require("./services/update-diet-plan.service");
let WorkoutModule = class WorkoutModule {
};
exports.WorkoutModule = WorkoutModule;
exports.WorkoutModule = WorkoutModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([workout_entity_1.Workout, diet_plan_entity_1.DietPlan])],
        controllers: [
            create_workout_controller_1.CreateWorkoutController,
            find_workout_controller_1.FindWorkoutController,
            update_workout_controller_1.UpdateWorkoutController,
            create_diet_plan_controller_1.CreateDietPlanController,
            find_diet_plan_controller_1.FindDietPlanController,
            update_diet_plan_controller_1.UpdateDietPlanController,
        ],
        providers: [
            workout_repository_1.WorkoutRepository,
            create_workout_service_1.CreateWorkoutService,
            find_workout_service_1.FindWorkoutService,
            update_workout_service_1.UpdateWorkoutService,
            create_diet_plan_service_1.CreateDietPlanService,
            find_diet_plan_service_1.FindDietPlanService,
            update_diet_plan_service_1.UpdateDietPlanService,
        ],
    })
], WorkoutModule);
//# sourceMappingURL=workout.module.js.map