import { Injectable } from '@nestjs/common';
@Injectable() export class GlobalAuditLogsService { async execute() { return { success: true, data: [] }; } }