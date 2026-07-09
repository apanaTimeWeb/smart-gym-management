"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const member_entity_1 = require("./entities/member.entity");
const members_repository_1 = require("./services/members.repository");
const create_member_service_1 = require("./services/create-member.service");
const find_member_service_1 = require("./services/find-member.service");
const update_member_service_1 = require("./services/update-member.service");
const renew_member_service_1 = require("./services/renew-member.service");
const member_stats_service_1 = require("./services/member-stats.service");
const create_member_controller_1 = require("./controllers/create-member.controller");
const find_member_controller_1 = require("./controllers/find-member.controller");
const update_member_controller_1 = require("./controllers/update-member.controller");
const renew_member_controller_1 = require("./controllers/renew-member.controller");
const member_stats_controller_1 = require("./controllers/member-stats.controller");
const payment_processed_listener_1 = require("./listeners/payment-processed.listener");
let MembersModule = class MembersModule {
};
exports.MembersModule = MembersModule;
exports.MembersModule = MembersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member])],
        controllers: [
            create_member_controller_1.CreateMemberController,
            find_member_controller_1.FindMemberController,
            update_member_controller_1.UpdateMemberController,
            renew_member_controller_1.RenewMemberController,
            member_stats_controller_1.MemberStatsController,
        ],
        providers: [
            members_repository_1.MembersRepository,
            create_member_service_1.CreateMemberService,
            find_member_service_1.FindMemberService,
            update_member_service_1.UpdateMemberService,
            renew_member_service_1.RenewMemberService,
            member_stats_service_1.MemberStatsService,
            payment_processed_listener_1.PaymentProcessedListener,
        ],
    })
], MembersModule);
//# sourceMappingURL=members.module.js.map