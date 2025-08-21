import { ImageStorage, ImageExtension } from '@/features/item/application/ports/ImageStorage';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export class LocalImageStorage implements ImageStorage {
  async saveForItem(itemId: number, dataUriBase64: string, ext: ImageExtension): Promise<string> {
    const filename = `${crypto.randomUUID()}.${ext}`;
    const relativeDir = path.join('items', String(itemId), 'images');
    const relativePath = path.join(relativeDir, filename);
    const absDir = path.join(process.cwd(), 'storage', 'public', relativeDir);
    const absPath = path.join(process.cwd(), 'storage', 'public', relativePath);

    await fs.mkdir(absDir, { recursive: true });

    const [_, fileData] = dataUriBase64.split(',');
    const buffer = Buffer.from(fileData, 'base64');
    await fs.writeFile(absPath, buffer, { flag: 'w' });

    return `/storage/${relativePath.replace(/\\\\/g, '/')}`;
  }
  private base64ToBuffer(dataUri: string): Buffer {
    const [, fileData] = dataUri.split(",");
    return Buffer.from(fileData, "base64");
  }
}
