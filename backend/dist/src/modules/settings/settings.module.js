"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const setting_entity_1 = require("./entities/setting.entity");
const settings_repository_1 = require("./settings.repository");
const get_settings_controller_1 = require("./controllers/get-settings.controller");
const update_settings_controller_1 = require("./controllers/update-settings.controller");
const get_settings_service_1 = require("./services/get-settings.service");
const update_settings_service_1 = require("./services/update-settings.service");
let SettingsModule = class SettingsModule {
};
exports.SettingsModule = SettingsModule;
exports.SettingsModule = SettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([setting_entity_1.Settings])],
        controllers: [
            get_settings_controller_1.GetSettingsController,
            update_settings_controller_1.UpdateSettingsController,
        ],
        providers: [
            settings_repository_1.SettingsRepository,
            get_settings_service_1.GetSettingsService,
            update_settings_service_1.UpdateSettingsService,
        ],
    })
], SettingsModule);
//# sourceMappingURL=settings.module.js.map