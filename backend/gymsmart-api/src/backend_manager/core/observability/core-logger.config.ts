// RESPONSIBILITY: Structured Pino logging redaction policy.
// FLOW: HTTP logs include operational metadata while sensitive headers/body fields are redacted.
import type { Params } from 'nestjs-pino'; export const CoreLoggerConfig:Params={pinoHttp:{redact:['req.headers.authorization','req.headers.cookie','req.body','res.body']}};
