// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> SettingsFetchSettingsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SettingsFetchSettingsResponseDto {
  @ApiProperty({ type: Object })
  gymProfile?: { address?: string; city?: string; gymName?: string; logoUrl?: string; pincode?: string; state?: string; };

  @ApiProperty({ type: Object })
  membershipSettings?: { gracePeriodDays?: number; maxFreezeDaysPerYear?: number; };

  @ApiProperty({ type: [Object] })
  notificationTemplates?: Array<{ body?: string; subject?: string; }>;

  @ApiProperty({ type: [Object] })
  operatingHours?: Array<{ closeTime?: string; day?: string; openTime?: string; }>;

  @ApiProperty({ type: Object })
  preferences?: { emailDailyReports?: string; language?: number; pushNotificationsEnabled?: string; timezone?: string; };

}
