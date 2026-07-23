import { storageService } from './storage.service';
import { sampleService } from './sample.service';
import type { UploadMetadata } from '@/store/upload-store';
import type { Sample } from '@/lib/types';

export class UploadService {
  async processUpload(file: File, metadata: UploadMetadata, userId: string): Promise<Sample> {
    // 1. Upload to Storage
    const storagePath = await storageService.uploadFile(file, userId);
    
    // 2. Insert metadata to DB
    const sample = await sampleService.createSample(metadata, storagePath, userId);
    
    return sample;
  }
}

export const uploadService = new UploadService();
