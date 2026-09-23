// RESPONSIBILITY: Owns backend core authorization/security guard.
// FLOW: Request context → authentication/authorization decision → allow or reject.
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { verify } from 'jsonwebtoken';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { CoreConfigService } from '@/backend_manager/core/config/core-config.service';
import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';

import type { Request } from 'express';

@Injectable() export class CoreJwtGuard implements CanActivate{constructor(private readonly reflector:Reflector,private readonly config:CoreConfigService,private readonly context:CoreRequestContextService){} canActivate(execution:ExecutionContext):boolean{if(this.reflector.getAllAndOverride<boolean>('core_public',[execution.getHandler(),execution.getClass()]))return true;const req=execution.switchToHttp().getRequest<Request>();const value=req.headers.authorization;if(!value?.startsWith('Bearer '))throw new UnauthorizedException({errorCode:'AUTH.ACCESS_TOKEN.MISSING'});try{const p=verify(value.slice(7),this.config.jwtAccessSecret) as {sub?:string;role?:string};if(!p.sub||!p.role||!Object.values(CoreRole).includes(p.role as CoreRole))throw new Error('invalid');this.context.setActor(p.sub,p.role as CoreRole);return true}catch{throw new UnauthorizedException({errorCode:'AUTH.ACCESS_TOKEN.INVALID'})}}}
