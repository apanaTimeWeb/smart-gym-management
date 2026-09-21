// RESPONSIBILITY: Defines the canonical Landing validation/business error response schema for OpenAPI documentation.
// FLOW: HTTP exception → ValidationExceptionFilter → LandingApiErrorResponseDto-shaped JSON.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiProperty({ example: 400 })
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
