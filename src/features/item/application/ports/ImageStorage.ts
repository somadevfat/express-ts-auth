export type ImageExtension = 'png' | 'jpg' | 'jpeg' | 'webp';

export interface ImageStorage {
  saveForItem(itemId: number, dataUriBase64: string, ext: ImageExtension): Promise<string>; // 例: '/storage/items/1/images/uuid.png'
}

