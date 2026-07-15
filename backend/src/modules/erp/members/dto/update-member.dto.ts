import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from '@/modules/erp/members/dto/create-member.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
