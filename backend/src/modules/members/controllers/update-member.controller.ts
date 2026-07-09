import { Controller, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateMemberService } from '@/modules/members/services/update-member.service';
import { UpdateMemberDto } from '@/modules/members/dto/update-member.dto';

@ApiTags('Members')
@Controller('members')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateMemberController {
  constructor(private readonly updateMemberService: UpdateMemberService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a member by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Member updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.updateMemberService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a member by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Member deleted successfully' })
  remove(@Param('id') id: string) {
    return this.updateMemberService.remove(id);
  }
}
