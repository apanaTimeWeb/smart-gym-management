// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerStoreCreateOrderProductDto { @ApiProperty() name!: string; @ApiPropertyOptional() unit?: string; }
export class ManagerStoreCreateOrderLineDto { @ApiProperty() id!: string; @ApiProperty({type:Number}) qty!: number; @ApiProperty({type:Number}) price!: number; @ApiProperty({type:ManagerStoreCreateOrderProductDto}) product!: ManagerStoreCreateOrderProductDto; }
export class ManagerStoreCreateOrderResponseDto { @ApiProperty() id!: string; @ApiProperty({type:Number}) total!: number; @ApiProperty() method!: string; @ApiProperty() status!: string; @ApiPropertyOptional() notes?: string; @ApiProperty() createdAt!: string; @ApiPropertyOptional() customerId?: string; @ApiPropertyOptional({type:Number}) gstAmount?: number; @ApiProperty({enum:['NONE','PARTIAL','FULL']}) returnStatus!: string; @ApiPropertyOptional({type:[ManagerStoreCreateOrderLineDto]}) items?: ManagerStoreCreateOrderLineDto[]; }
export { ManagerStoreCreateOrderResponseDto as StoreCreateOrderResponseDto };
