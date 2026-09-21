// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class GymDetailBusinessOverviewResponseDto {
  @ApiProperty()
  gymId!: string;
  @ApiProperty()
  gymName!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty()
  ownerName!: string;
  @ApiProperty()
  adminEmail!: string;
  @ApiProperty()
  phone!: string;
  @ApiProperty()
  createdAt!: string;
  @ApiProperty()
  city!: string;
  @ApiProperty()
  state!: string;
  @ApiProperty()
  memberCount!: number;
  @ApiProperty()
  monthlyRevenue!: number;
  @ApiProperty()
  plan!: string;
  @ApiProperty()
  databaseVersion!: string;
  @ApiProperty()
  tabs!: string[];
  @ApiProperty()
  health!: { score: number; loginTrend: number; memberTrend: number; paymentFailures: number; openTickets: number };
  @ApiProperty()
  usage!: Array<{ label: string; used: number; limit: number; percent: number }>;
  @ApiProperty()
  billing!: { monthlyIncome: number; nextPayment: string; failedPayments: number; discount: string };
  @ApiProperty()
  support!: { openTickets: number; averageResponseHours: number; satisfaction: number };
  @ApiProperty()
  activity!: Array<{ date: string; event: string }>;
  @ApiProperty()
  subscription!: { plan: string; started: string; renewal: string; monthlyIncome: number };
}
