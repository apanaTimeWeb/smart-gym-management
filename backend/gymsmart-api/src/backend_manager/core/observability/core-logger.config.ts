// RESPONSIBILITY: Owns backend core module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import type { Params } from 'nestjs-pino';

 export const CoreLoggerConfig:Params={pinoHttp:{redact:['req.headers.authorization','req.headers.cookie','req.body','res.body']}};
