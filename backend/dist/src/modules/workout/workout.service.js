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
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let WorkoutService = class WorkoutService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAllWorkouts(query) {
        return this.prisma.workout.findMany({ where: { isActive: true } });
    }
    createWorkout(dto) {
        return this.prisma.workout.create({ data: dto });
    }
    updateWorkout(id, dto) {
        return this.prisma.workout.update({ where: { id }, data: dto });
    }
    removeWorkout(id) {
        return this.prisma.workout.update({
            where: { id },
            data: { isActive: false },
        });
    }
    findAllDietPlans(query) {
        return this.prisma.dietPlan.findMany({ where: { isActive: true } });
    }
    createDietPlan(dto) {
        return this.prisma.dietPlan.create({ data: dto });
    }
    updateDietPlan(id, dto) {
        return this.prisma.dietPlan.update({ where: { id }, data: dto });
    }
    removeDietPlan(id) {
        return this.prisma.dietPlan.update({
            where: { id },
            data: { isActive: false },
        });
    }
};
exports.WorkoutService = WorkoutService;
exports.WorkoutService = WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutService);
//# sourceMappingURL=workout.service.js.map