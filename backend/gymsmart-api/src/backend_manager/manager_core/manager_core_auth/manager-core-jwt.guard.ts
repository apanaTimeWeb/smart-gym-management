// RESPONSIBILITY: Owns backend core authorization/security guard.
// FLOW: Request context → authentication/authorization decision → allow or reject.
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { verify } from 'jsonwebtoken';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';

import type { Request } from 'express';

@Injectable() export class ManagerCoreJwtGuard implements CanActivate{constructor(private readonly reflector:Reflector,private readonly config:ManagerCoreConfigService,private readonly context:ManagerCoreRequestContextService){} canActivate(execution:ExecutionContext):boolean{if(this.reflector.getAllAndOverride<boolean>('core_public',[execution.getHandler(),execution.getClass()]))return true;const req=execution.switchToHttp().getRequest<Request>();const value=req.headers.authorization;if(!value?.startsWith('Bearer '))throw new UnauthorizedException({errorCode:'AUTH.ACCESS_TOKEN.MISSING'});try{const p=verify(value.slice(7),this.config.jwtAccessSecret) as {sub?:string;role?:string;branchId?:string};if(!p.sub||!p.role||!Object.values(ManagerCoreRole).includes(p.role as ManagerCoreRole))throw new UnauthorizedException({errorCode:'AUTH.ACCESS_TOKEN.INVALID'});this.context.setActor(p.sub,p.role as ManagerCoreRole,p.branchId);return true}catch{throw new UnauthorizedException({errorCode:'AUTH.ACCESS_TOKEN.INVALID'})}}}
