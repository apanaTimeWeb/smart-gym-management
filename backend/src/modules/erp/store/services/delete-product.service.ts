import { Injectable } from '@nestjs/common';
import { STORE_CONSTANTS } from '../store.constants';
import { ProductResponse } from '../store.interfaces';
@Injectable() export class DeleteProductService { async execute(id: string): Promise<ProductResponse> { return { success: true, message: STORE_CONSTANTS.SUCCESS_MESSAGES.PRODUCT_DELETED, data: null }; } }