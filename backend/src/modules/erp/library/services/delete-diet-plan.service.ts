import { Injectable } from '@nestjs/common';
@Injectable() export class DeleteDietPlanService { async execute(id: string) { return { success: true }; } }