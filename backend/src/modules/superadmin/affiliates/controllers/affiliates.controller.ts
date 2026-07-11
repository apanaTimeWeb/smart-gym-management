import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { AffiliatesService } from '../services/affiliates.service';
import { CreateAffiliateDto } from '../dto/create-affiliates.dto';
import { UpdateAffiliateDto } from '../dto/update-affiliates.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Affiliates')
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AffiliatesController {
  constructor(private readonly affiliatesService: AffiliatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Affiliate' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateAffiliateDto) {
    return this.affiliatesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Affiliates' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.affiliatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Affiliate' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.affiliatesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Affiliate' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateAffiliateDto) {
    return this.affiliatesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Affiliate' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.affiliatesService.remove(id);
  }
}
