import { AuthRepository } from "./services/auth.repository";
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from "./auth.interfaces";
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    private readonly logger;
    constructor(authRepository: AuthRepository, configService: ConfigService);
    validate(payload: JwtPayload): Promise<Partial<import("./entities/user.entity").User>>;
}
export {};
