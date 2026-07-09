import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async processAndSaveImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      const filename = `${randomUUID()}.webp`;
      const outputPath = path.join(this.uploadDir, filename);

      await sharp(file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      this.logger.log(`File processed and saved: ${filename}`);

      return {
        success: true,
        data: {
          url: `/uploads/${filename}`,
          filename,
        },
      };
    } catch (error) {
      this.logger.error(`Error processing image: ${error.message}`);
      throw new BadRequestException('Invalid image file');
    }
  }
}
