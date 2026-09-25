import { Controller, Get, UseGuards } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';

@Controller('superadmin/dashboard')
@UseGuards(SuperadminCoreJwtAuthGuard)
export class SuperadminDashboardController {
  @Get()
  getDashboard() {
    return {
      success: true,
      message: 'Request completed successfully',
      data: {
        metrics: {
          currency: 'INR',
          totalGyms: 0,
          activeGyms: 0,
          suspendedGyms: 0,
          trialGyms: 0,
          totalEndUsers: 0,
          monthlyRecurringRevenue: 0,
          overdueInvoicesCount: 0,
          pendingRevenue: 0,
          recentOnboards: []
        },
        revenue: [],
        growth: []
      }
    };
  }
}
