import { Injectable } from '@nestjs/common';
@Injectable() export class DeleteProductService { async execute(id: string) { return { success: true }; } }