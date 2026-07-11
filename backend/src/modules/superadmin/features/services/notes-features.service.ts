import { Injectable } from '@nestjs/common';
@Injectable() export class NotesFeaturesService { async execute(dto: any) { return { success: true }; } }