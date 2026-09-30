// RESPONSIBILITY: Documents the canonical success envelope returned by disposable tenant destruction.
// FLOW: Test tenant controller -> LandingResponseInterceptor -> this OpenAPI response shape.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Intent: Make the test-only tenant destruction response self-discoverable in OpenAPI.
 * Edge Cases: Unknown tenant IDs resolve to an already-destroyed state without revealing additional tenant data.
 * Side Effects: The corresponding disposable tenant database may be permanently dropped.
 * AI Notes: Production offboarding never uses this DTO; Rule 110 retention controls production deletion.
 */
export class LandingTestTenantDestroyResponseDto {
  @ApiProperty({ example: true }) success!: boolean;
  @ApiProperty({ example: 'Request completed successfully.' }) message!: string;
  @ApiProperty({ example: { destroyed: true }, nullable: true }) data!: { destroyed: true } | null;
}
