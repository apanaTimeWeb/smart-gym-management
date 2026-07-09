import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '../store.repository';

@Injectable()
export class StoreSummaryService {
  private readonly logger = new Logger(StoreSummaryService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute() {
    this.logger.log(`Fetching store summary stats`);
    const stats = await this.repository.getSummaryStats();
    
    return { 
      success: true, 
      data: {
        totalProducts: stats.totalProducts,
        totalOrders: stats.totalOrders,
        totalRevenue: parseFloat(stats.totalRevenue) || 0,
        lowStockProducts: stats.lowStockProducts,
      } 
    };
  }
}
