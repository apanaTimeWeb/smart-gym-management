import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteAffiliatesService } from '../services/delete-affiliates.service';

@ApiTags('Affiliates')
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteAffiliatesController {
  constructor(private readonly affiliatesService: DeleteAffiliatesService) {}
  
  @Delete()
  async execute() {
    return this.affiliatesService.execute();
  }
}
