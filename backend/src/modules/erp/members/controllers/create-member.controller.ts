import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateMemberService } from '@/modules/erp/members/services/create-member.service';
import { CreateMemberDto } from '@/modules/erp/members/dto/create-member.dto';

@ApiTags('Members')
@Controller('members')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateMemberController {
  constructor(private readonly createMemberService: CreateMemberService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Member created successfully',
  })
  create(@Body() dto: CreateMemberDto) {
    return this.createMemberService.create(dto);
  }
}
