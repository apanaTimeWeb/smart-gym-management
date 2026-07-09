import { Controller, Get, Param, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindMemberService } from '@/modules/members/services/find-member.service';
import { FindMemberDto } from '@/modules/members/dto/find-member.dto';

@ApiTags('Members')
@Controller('members')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindMemberController {
  constructor(private readonly findMemberService: FindMemberService) {}

  @Get()
  @ApiOperation({ summary: 'Find all members with optional pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Members fetched successfully' })
  findAll(@Query() query: FindMemberDto) {
    return this.findMemberService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a member by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Member fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.findMemberService.findOne(id);
  }
}
