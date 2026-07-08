import { PrismaService } from '../../database/prisma.service';
import { ConfigService } from '@nestjs/config';
export interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        branch: string | null;
        isActive: boolean;
    }>;
}
export {};
