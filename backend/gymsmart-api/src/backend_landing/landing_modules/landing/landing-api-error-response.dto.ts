// RESPONSIBILITY: Defines the canonical Landing validation/business error response schema for OpenAPI documentation.
// FLOW: HTTP exception â†’ LandingValidationExceptionFilter â†’ LandingApiErrorResponseDto-shaped JSON.
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Intent: Defines the landing api error response dto boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingApiErrorResponseDto {
  @ApiProperty({ example: false })
  success!: false;

  @ApiProperty({ example: 'Please check the submitted form fields.' })
  message!: string;

  @ApiProperty({ nullable: true, example: null })
  data!: null;

  @ApiProperty({ example: 'VALIDATION_ERROR' })
  error!: string;

  @ApiProperty({ example: 'VALIDATION.DTO.FAILED' })
  errorCode!: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode!: number;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        field: { type: 'string', example: 'email' },
        message: { type: 'string', example: 'email must be an email' },
      },
      required: ['field', 'message'],
    },
  })
  validationErrors?: Array<{ field: string; message: string }>;
}
