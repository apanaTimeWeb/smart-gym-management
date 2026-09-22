// RESPONSIBILITY: Marks routes that are intentionally public.
// FLOW: Metadata → JWT/Tenant guards detect public endpoint → bypass authentication boundary.
import { SetMetadata } from '@nestjs/common'; export const CorePublicDecorator=()=>SetMetadata('core_public',true);
