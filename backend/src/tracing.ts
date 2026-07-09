import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import pino from 'pino';

const logger = pino();

const traceExporter = new OTLPTraceExporter({
  url: process.env.OTLP_TRACE_URL || 'http://localhost:4318/v1/traces',
});

export const otelSDK = new NodeSDK({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: 'gymsmart-backend',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(() => logger.info('Tracing terminated'))
    .catch((error) => logger.error({ err: error }, 'Error terminating tracing'))
    .finally(() => process.exit(0));
});
