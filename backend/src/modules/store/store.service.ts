import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  findAllProducts(query: any) {
    return this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
  createProduct(dto: any) {
    return this.prisma.product.create({ data: dto });
  }
  updateProduct(id: number, dto: any) {
    return this.prisma.product.update({ where: { id }, data: dto });
  }
  removeProduct(id: number) {
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  findAllOrders(query: any) {
    return this.prisma.order
      .findMany({
        include: { items: { include: { product: true } } },
        orderBy: { id: 'desc' },
      })
      .then((orders) => ({ orders, total: orders.length }));
  }
  async createOrder(dto: any) {
    let total = 0;
    // Basic implementation
    const order = await this.prisma.order.create({
      data: {
        total: 0,
        method: dto.method,
        status: 'COMPLETED',
        notes: dto.notes,
      },
    });
    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (product) {
        total += product.price * item.qty;
        await this.prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            qty: item.qty,
            price: product.price,
          },
        });
        await this.prisma.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.qty } },
        });
      }
    }
    await this.prisma.order.update({
      where: { id: order.id },
      data: { total },
    });
    return this.prisma.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    });
  }

  async getStoreSummary() {
    const totalProducts = await this.prisma.product.count({
      where: { isActive: true },
    });
    const totalOrders = await this.prisma.order.count();
    const totalRevenue =
      (await this.prisma.order.aggregate({ _sum: { total: true } }))._sum
        .total || 0;
    const lowStockProducts = await this.prisma.product.findMany({
      where: { stock: { lte: 10 }, isActive: true },
    });
    return { totalProducts, totalOrders, totalRevenue, lowStockProducts };
  }
}
