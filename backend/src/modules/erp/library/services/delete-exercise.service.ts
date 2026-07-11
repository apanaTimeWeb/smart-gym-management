import { Injectable } from '@nestjs/common';
@Injectable() export class DeleteExerciseService { async execute(id: string) { return { success: true }; } }