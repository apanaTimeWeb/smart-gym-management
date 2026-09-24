// RESPONSIBILITY: Initializes OpenTelemetry Node tracing before NestJS and database/network modules load.
// FLOW: Process start â†’ OpenTelemetry SDK â†’ auto instrumentation â†’ NestJS/HTTP/PG/Redis spans.
import { NodeSDK } from '@opentelemetry/sdk-node';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';


const sdk = new NodeSDK({
  serviceName: process.env.OTEL_SERVICE_NAME ?? 'gym-smart-backend',
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

process.once('SIGTERM', () => {
  void sdk.shutdown();
});
process.once('SIGINT', () => {
  void sdk.shutdown();
});
