// RESPONSIBILITY: Documents the canonical success envelope returned by disposable tenant provisioning.
// FLOW: Test tenant controller -> LandingResponseInterceptor -> this OpenAPI response shape.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Intent: Make the test-only tenant provisioning response self-discoverable in OpenAPI.
 * Edge Cases: tenantId is always a real UUID extracted from the master registry after provisioning.
 * Side Effects: None.
 * AI Notes: This DTO documents the envelope only; persistence remains in the provisioning service.
 */
export class LandingTestTenantProvisionResponseDto {
  @ApiProperty({ example: true }) success!: boolean;
  @ApiProperty({ example: 'Request completed successfully.' }) message!: string;
  @ApiProperty({
    example: { tenantId: '2b7b67e7-8751-4a7a-a7f5-1f8f0f06d7f4' },
    nullable: true,
  }) data!: { tenantId: string } | null;
}
