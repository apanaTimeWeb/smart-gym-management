"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const store_repository_1 = require("./store.repository");
const create_product_controller_1 = require("./controllers/create-product.controller");
const find_product_controller_1 = require("./controllers/find-product.controller");
const update_product_controller_1 = require("./controllers/update-product.controller");
const create_order_controller_1 = require("./controllers/create-order.controller");
const find_order_controller_1 = require("./controllers/find-order.controller");
const store_summary_controller_1 = require("./controllers/store-summary.controller");
const create_product_service_1 = require("./services/create-product.service");
const find_product_service_1 = require("./services/find-product.service");
const update_product_service_1 = require("./services/update-product.service");
const create_order_service_1 = require("./services/create-order.service");
const find_order_service_1 = require("./services/find-order.service");
const store_summary_service_1 = require("./services/store-summary.service");
let StoreModule = class StoreModule {
};
exports.StoreModule = StoreModule;
exports.StoreModule = StoreModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, order_entity_1.Order, order_item_entity_1.OrderItem])],
        controllers: [
            create_product_controller_1.CreateProductController,
            find_product_controller_1.FindProductController,
            update_product_controller_1.UpdateProductController,
            create_order_controller_1.CreateOrderController,
            find_order_controller_1.FindOrderController,
            store_summary_controller_1.StoreSummaryController,
        ],
        providers: [
            store_repository_1.StoreRepository,
            create_product_service_1.CreateProductService,
            find_product_service_1.FindProductService,
            update_product_service_1.UpdateProductService,
            create_order_service_1.CreateOrderService,
            find_order_service_1.FindOrderService,
            store_summary_service_1.StoreSummaryService,
        ],
    })
], StoreModule);
//# sourceMappingURL=store.module.js.map