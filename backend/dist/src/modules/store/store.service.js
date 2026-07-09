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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
let StoreService = class StoreService {
    productRepository;
    orderRepository;
    orderItemRepository;
    constructor(productRepository, orderRepository, orderItemRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }
    async findAllProducts(query) {
        const data = await this.productRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
        return { success: true, data };
    }
    async createProduct(dto) {
        const product = this.productRepository.create(dto);
        const data = await this.productRepository.save(product);
        return { success: true, data };
    }
    async updateProduct(id, dto) {
        await this.productRepository.update(id, dto);
        const data = await this.productRepository.findOne({ where: { id } });
        return { success: true, data };
    }
    async removeProduct(id) {
        await this.productRepository.update(id, { isActive: false });
        const data = await this.productRepository.findOne({ where: { id } });
        return { success: true, data };
    }
    async findAllOrders(query) {
        const orders = await this.orderRepository.find({
            relations: ['items', 'items.product'],
            order: { id: 'DESC' },
        });
        return { success: true, data: { orders, total: orders.length } };
    }
    async createOrder(dto) {
        let total = 0;
        const order = this.orderRepository.create({
            total: 0,
            method: dto.method,
            status: 'Completed',
            notes: dto.notes,
        });
        const savedOrder = await this.orderRepository.save(order);
        for (const item of dto.items) {
            const product = await this.productRepository.findOne({ where: { id: item.productId } });
            if (product) {
                total += product.price * item.qty;
                const orderItem = this.orderItemRepository.create({
                    order: savedOrder,
                    product: product,
                    qty: item.qty,
                    price: product.price,
                });
                await this.orderItemRepository.save(orderItem);
                product.stock -= item.qty;
                await this.productRepository.save(product);
            }
        }
        savedOrder.total = total;
        const data = await this.orderRepository.save(savedOrder);
        return { success: true, data };
    }
    async getStoreSummary() {
        const totalProducts = await this.productRepository.count({ where: { isActive: true } });
        const totalOrders = await this.orderRepository.count();
        const { totalRevenue } = await this.orderRepository
            .createQueryBuilder('order')
            .select('SUM(order.total)', 'totalRevenue')
            .getRawOne();
        const lowStockProducts = await this.productRepository.find({
            where: { isActive: true },
        });
        const filteredLowStock = lowStockProducts.filter(p => p.stock <= 10);
        return {
            success: true,
            data: {
                totalProducts,
                totalOrders,
                totalRevenue: parseFloat(totalRevenue) || 0,
                lowStockProducts: filteredLowStock
            }
        };
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StoreService);
//# sourceMappingURL=store.service.js.map