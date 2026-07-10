import { Injectable } from '@nestjs/common';

@Injectable()
export class FindSalesService {
  execute() {
    // Mock sales data for the frontend static UI
    return {
      success: true,
      data: {
        totalRevenue: 0,
        recentSales: [],
      },
    };
  }
}
