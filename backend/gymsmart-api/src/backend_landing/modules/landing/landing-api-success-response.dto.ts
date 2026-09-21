// RESPONSIBILITY: Defines the concrete success response schema documented by the Landing frontend contract.
// FLOW: Landing controller â†’ ResponseInterceptor passthrough â†’ LandingApiSuccessResponseDto-shaped JSON.
import { ApiProperty } from '@nestjs/swagger';

export class LandingApiSuccessResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty({ example: 'Booking submitted successfully. Our team will contact you shortly.' })
  message!: string;

  @ApiProperty({ nullable: true, example: null })
  data!: null;
}
