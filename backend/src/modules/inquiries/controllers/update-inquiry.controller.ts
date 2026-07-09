import {
  Controller,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateInquiryService } from '../services/update-inquiry.service';
import { UpdateInquiryDto } from '../dto/update-inquiry.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Inquiries')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('inquiries')
export class UpdateInquiryController {
  constructor(private readonly updateInquiryService: UpdateInquiryService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update an inquiry' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inquiry updated successfully',
  })
  update(@Param('id') id: string, @Body() dto: UpdateInquiryDto) {
    return this.updateInquiryService.execute(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an inquiry' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inquiry removed successfully',
  })
  remove(@Param('id') id: string) {
    return this.updateInquiryService.remove(+id);
  }
}
