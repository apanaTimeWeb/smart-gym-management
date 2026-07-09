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
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const workout_entity_1 = require("./entities/workout.entity");
const diet_plan_entity_1 = require("./entities/diet-plan.entity");
let WorkoutService = class WorkoutService {
    workoutRepository;
    dietPlanRepository;
    constructor(workoutRepository, dietPlanRepository) {
        this.workoutRepository = workoutRepository;
        this.dietPlanRepository = dietPlanRepository;
    }
    async findAllWorkouts(query) {
        const data = await this.workoutRepository.find({
            where: { isActive: true },
            order: { id: 'ASC' },
        });
        return { success: true, data };
    }
    async createWorkout(dto) {
        const workout = this.workoutRepository.create(dto);
        const data = await this.workoutRepository.save(workout);
        return { success: true, data };
    }
    async updateWorkout(id, dto) {
        await this.workoutRepository.update(id, dto);
        const data = await this.workoutRepository.findOne({ where: { id } });
        return { success: true, data };
    }
    async removeWorkout(id) {
        await this.workoutRepository.update(id, { isActive: false });
        const data = await this.workoutRepository.findOne({ where: { id } });
        return { success: true, data };
    }
    async findAllDietPlans(query) {
        const data = await this.dietPlanRepository.find({
            where: { isActive: true },
            order: { id: 'ASC' },
        });
        return { success: true, data };
    }
    async createDietPlan(dto) {
        const dietPlan = this.dietPlanRepository.create(dto);
        const data = await this.dietPlanRepository.save(dietPlan);
        return { success: true, data };
    }
    async updateDietPlan(id, dto) {
        await this.dietPlanRepository.update(id, dto);
        const data = await this.dietPlanRepository.findOne({ where: { id } });
        return { success: true, data };
    }
    async removeDietPlan(id) {
        await this.dietPlanRepository.update(id, { isActive: false });
        const data = await this.dietPlanRepository.findOne({ where: { id } });
        return { success: true, data };
    }
};
exports.WorkoutService = WorkoutService;
exports.WorkoutService = WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workout_entity_1.Workout)),
    __param(1, (0, typeorm_1.InjectRepository)(diet_plan_entity_1.DietPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WorkoutService);
//# sourceMappingURL=workout.service.js.map