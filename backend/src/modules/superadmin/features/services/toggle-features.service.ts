import { Injectable } from '@nestjs/common';
@Injectable() export class ToggleFeaturesService { async execute(id: string) { return { success: true }; } }