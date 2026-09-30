// RESPONSIBILITY: Defines the exact successful response schema consumed by the supplied Landing frontend contract.
// FLOW: Landing command controller -> LandingCommandResult -> LandingResponseInterceptor -> canonical null-data JSON.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Intent: Document the successful null-data response required by the actual frontend API client and MSW contract.
 * Edge Cases: data is intentionally null; message is backend-controlled and user-visible.
 * Side Effects: None; this DTO is documentation-only.
 * AI Notes: Do not add domain fields to data without reopening the frontend contract freeze.
 */
export class LandingApiSuccessResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty({ example: 'Booking submitted successfully. Our team will contact you shortly.' })
  message!: string;

  @ApiProperty({ nullable: true, example: null })
  data!: null;
}
