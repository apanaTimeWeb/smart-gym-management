"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const throttler_storage_redis_1 = require("@nest-lab/throttler-storage-redis");
const cache_manager_1 = require("@nestjs/cache-manager");
const keyv_1 = require("keyv");
const redis_1 = __importDefault(require("@keyv/redis"));
const event_emitter_1 = require("@nestjs/event-emitter");
const bullmq_1 = require("@nestjs/bullmq");
const nestjs_pino_1 = require("nestjs-pino");
const correlation_id_middleware_1 = require("./core/middleware/correlation-id.middleware");
const health_module_1 = require("./core/health/health.module");
const auth_module_1 = require("./modules/auth/auth.module");
const members_module_1 = require("./modules/members/members.module");
const plans_module_1 = require("./modules/plans/plans.module");
const finance_module_1 = require("./modules/finance/finance.module");
const hr_module_1 = require("./modules/hr/hr.module");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const store_module_1 = require("./modules/store/store.module");
const workout_module_1 = require("./modules/workout/workout.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const inquiries_module_1 = require("./modules/inquiries/inquiries.module");
const settings_module_1 = require("./modules/settings/settings.module");
const media_module_1 = require("./core/media/media.module");
const audit_module_1 = require("./modules/audit/audit.module");
const sales_module_1 = require("./modules/sales/sales.module");
const library_module_1 = require("./modules/library/library.module");
const audit_interceptor_1 = require("./core/interceptors/audit.interceptor");
const idempotency_interceptor_1 = require("./core/interceptors/idempotency.interceptor");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(correlation_id_middleware_1.CorrelationIdMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: {
                        target: 'pino-pretty',
                        options: { singleLine: true },
                    },
                },
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    throttlers: [
                        {
                            ttl: 60000,
                            limit: 100,
                        },
                    ],
                    storage: new throttler_storage_redis_1.ThrottlerStorageRedisService(`redis://${config.get('REDIS_HOST', 'localhost')}:${config.get('REDIS_PORT', 6379)}`),
                }),
            }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const redisUrl = `redis://${config.get('REDIS_HOST', 'localhost')}:${config.get('REDIS_PORT', 6379)}`;
                    return {
                        store: new keyv_1.Keyv({
                            store: new redis_1.default(redisUrl),
                        }),
                        ttl: 5000,
                    };
                },
            }),
            bullmq_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    connection: {
                        host: configService.get('REDIS_HOST') || 'localhost',
                        port: configService.get('REDIS_PORT') || 6379,
                    },
                }),
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    url: configService.get('DATABASE_URL'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: false,
                }),
            }),
            health_module_1.HealthModule,
            media_module_1.MediaModule,
            auth_module_1.AuthModule,
            members_module_1.MembersModule,
            plans_module_1.PlansModule,
            finance_module_1.FinanceModule,
            hr_module_1.HrModule,
            attendance_module_1.AttendanceModule,
            store_module_1.StoreModule,
            workout_module_1.WorkoutModule,
            dashboard_module_1.DashboardModule,
            inquiries_module_1.InquiriesModule,
            settings_module_1.SettingsModule,
            audit_module_1.AuditModule,
            sales_module_1.SalesModule,
            library_module_1.LibraryModule,
            nestjs_prometheus_1.PrometheusModule.register({
                path: '/metrics',
                defaultMetrics: {
                    enabled: true,
                },
            }),
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: audit_interceptor_1.AuditInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: idempotency_interceptor_1.IdempotencyInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map