// RESPONSIBILITY: Produces reusable Swagger schemas that exactly describe the canonical ApiResponse<T> contract.
// FLOW: Auth controller decorator -> Swagger schema generation -> ApiResponse<T> documentation.

import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import type { Type } from '@nestjs/common';

/**
 * @description Documents a successful endpoint response using the canonical ApiResponse<T> envelope.
 * @param dataType - DTO class used for the envelope data payload.
 * @param status - Successful HTTP status.
 * @returns A Swagger method decorator.
 */
export function CoreApiResponseSwagger(dataType: Type<unknown>, status: HttpStatus = HttpStatus.OK): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(dataType),
    ApiResponse({
      status,
      schema: {
        type: 'object',
        required: ['success', 'message', 'data'],
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Request completed successfully.' },
          data: { $ref: getSchemaPath(dataType) },
          meta: {
            description: 'Present only on paginated list responses.',
            type: 'object',
            required: ['total', 'page', 'limit', 'totalPages', 'hasNextPage', 'hasPrevPage'],
            properties: {
              total: { type: 'integer', example: 243 },
              page: { type: 'integer', example: 2 },
              limit: { type: 'integer', example: 20 },
              totalPages: { type: 'integer', example: 13 },
              hasNextPage: { type: 'boolean', example: true },
              hasPrevPage: { type: 'boolean', example: true },
            },
          },
        },
      },
    }),
  );
}

/**
 * @description Documents a canonical validation-error response.
 * @returns A Swagger method decorator.
 */
export function CoreApiValidationErrorSwagger(): MethodDecorator {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failure using the canonical API error envelope.',
    schema: {
      type: 'object',
      required: ['success', 'message', 'data', 'error', 'errorCode', 'statusCode', 'validationErrors'],
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Validation failed. Please check the highlighted fields.' },
        data: { nullable: true, example: null },
        error: { type: 'string', example: 'VALIDATION_ERROR' },
        errorCode: { type: 'string', example: 'VALIDATION.DTO.FAILED' },
        statusCode: { type: 'integer', example: HttpStatus.BAD_REQUEST },
        validationErrors: {
          type: 'array',
          items: {
            type: 'object',
            required: ['field', 'message'],
            properties: {
              field: { type: 'string', example: 'email' },
              message: { type: 'string', example: 'email must be a valid email address' },
            },
          },
        },
      },
    },
  });
}

/**
 * @description Documents a canonical non-validation API error response.
 * @param status - Error HTTP status represented by the schema.
 * @param errorCode - Example machine-readable error code.
 * @returns A Swagger method decorator.
 */
export function CoreApiErrorSwagger(status: HttpStatus, errorCode: string): MethodDecorator {
  return ApiResponse({
    status,
    schema: {
      type: 'object',
      required: ['success', 'message', 'data', 'error', 'errorCode', 'statusCode'],
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Request rejected.' },
        data: { nullable: true, example: null },
        error: { type: 'string', example: 'UNAUTHORIZED' },
        errorCode: { type: 'string', example: errorCode },
        statusCode: { type: 'integer', example: status },
      },
    },
  });
}
