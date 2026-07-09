"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tracing_1 = require("./tracing");
tracing_1.otelSDK.start();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_interceptor_1 = require("./modules/core/interceptors/response.interceptor");
const http_exception_filter_1 = require("./modules/core/filters/http-exception.filter");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    const logger = new common_1.Logger('Bootstrap');
    app.enableShutdownHooks();
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    const configService = app.get(config_1.ConfigService);
    const frontendUrl = configService.get('FRONTEND_URL') || 'http://localhost:3000';
    app.enableCors({
        origin: [frontendUrl],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GymSmart ERP API')
        .setDescription('Complete Gym Management System REST API')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
        .addTag('Auth', 'Authentication endpoints')
        .addTag('Members', 'Gym member management')
        .addTag('Plans', 'Membership plans')
        .addTag('Finance', 'Payments and billing')
        .addTag('HR', 'Staff and payroll')
        .addTag('Attendance', 'Attendance tracking')
        .addTag('Store', 'Product store and POS')
        .addTag('Workout', 'Workout and diet library')
        .addTag('Dashboard', 'Analytics and KPIs')
        .addTag('Inquiries', 'Lead management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    const port = configService.get('PORT') || 5000;
    await app.listen(port);
    logger.log(`\n🏋️  GymSmart Backend is running!`);
    logger.log(`🚀  API:     http://localhost:${port}/api`);
    logger.log(`📚  Docs:    http://localhost:${port}/api/docs\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map