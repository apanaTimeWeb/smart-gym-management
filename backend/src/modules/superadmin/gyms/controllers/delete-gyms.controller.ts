import { Controller, Delete, Param, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteGymsService } from '../services/delete-gyms.service';


@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteGymsController {
  constructor(private readonly service: DeleteGymsService) {}
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Tenant' })
  @ApiQuery({ name: 'hardDelete', required: false, type: Boolean, description: 'Physically delete the tenant and its database' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Query('hardDelete') hardDelete?: string) {
    const isHardDelete = hardDelete === 'true';
    return this.service.execute(id, isHardDelete);
  }
}
