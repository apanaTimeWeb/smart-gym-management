// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerStoreProductItemResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() category!: string; @ApiProperty({type:Number}) price!: number; @ApiProperty({type:Number}) stock!: number; @ApiPropertyOptional() description?: string; @ApiPropertyOptional() imageUrl?: string; @ApiProperty({type:Boolean}) isActive!: boolean; @ApiPropertyOptional() unit?: string; @ApiPropertyOptional() sku?: string; @ApiPropertyOptional() barcode?: string; @ApiPropertyOptional({type:Number}) costPrice?: number; @ApiPropertyOptional({type:Number}) reorderThreshold?: number; }
export { ManagerStoreProductItemResponseDto as StoreProductItemResponseDto };
