// RESPONSIBILITY: Builds the application OpenAPI document with versioned route guidance.
// FLOW: Nest application → DocumentBuilder → OpenAPI document.


import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
export function buildCoreSwaggerConfig(): Omit<OpenAPIObject, 'paths'> { return new DocumentBuilder().setTitle('Smart Gym 360 Trainer API').setDescription('Versioned Trainer API').setVersion('1.0').addBearerAuth().build(); }
