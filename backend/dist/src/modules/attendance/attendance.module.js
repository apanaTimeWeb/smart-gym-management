"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const attendance_repository_1 = require("./services/attendance.repository");
const mark_attendance_service_1 = require("./services/mark-attendance.service");
const find_attendance_service_1 = require("./services/find-attendance.service");
const attendance_stats_service_1 = require("./services/attendance-stats.service");
const mark_attendance_controller_1 = require("./controllers/mark-attendance.controller");
const find_attendance_controller_1 = require("./controllers/find-attendance.controller");
const attendance_stats_controller_1 = require("./controllers/attendance-stats.controller");
let AttendanceModule = class AttendanceModule {
};
exports.AttendanceModule = AttendanceModule;
exports.AttendanceModule = AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attendance_entity_1.Attendance])],
        controllers: [
            mark_attendance_controller_1.MarkAttendanceController,
            find_attendance_controller_1.FindAttendanceController,
            attendance_stats_controller_1.AttendanceStatsController,
        ],
        providers: [
            attendance_repository_1.AttendanceRepository,
            mark_attendance_service_1.MarkAttendanceService,
            find_attendance_service_1.FindAttendanceService,
            attendance_stats_service_1.AttendanceStatsService,
        ],
    })
], AttendanceModule);
//# sourceMappingURL=attendance.module.js.map