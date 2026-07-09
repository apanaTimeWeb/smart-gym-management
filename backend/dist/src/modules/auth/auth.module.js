"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const auth_repository_1 = require("./auth.repository");
const auth_login_controller_1 = require("./controllers/auth-login.controller");
const auth_me_controller_1 = require("./controllers/auth-me.controller");
const auth_login_service_1 = require("./services/auth-login.service");
const auth_me_service_1 = require("./services/auth-me.service");
const auth_strategy_1 = require("./auth.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'gymsmart_secret',
                    signOptions: {
                        expiresIn: (configService.get('JWT_EXPIRES_IN') ||
                            '7d'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_login_controller_1.AuthLoginController, auth_me_controller_1.AuthMeController],
        providers: [auth_repository_1.AuthRepository, auth_login_service_1.AuthLoginService, auth_me_service_1.AuthMeService, auth_strategy_1.JwtStrategy],
        exports: [auth_login_service_1.AuthLoginService, auth_me_service_1.AuthMeService, jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map