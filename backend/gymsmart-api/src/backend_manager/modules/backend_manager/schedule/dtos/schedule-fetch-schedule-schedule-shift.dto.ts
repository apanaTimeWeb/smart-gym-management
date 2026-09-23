// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleFetchScheduleScheduleShiftDto { @ApiProperty() id!: string; @ApiProperty() day!: string; @ApiProperty() startTime!: string; @ApiProperty() endTime!: string; @ApiProperty() notes!: string; @ApiProperty() status!: string; }
