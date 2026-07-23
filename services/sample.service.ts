import { createClient } from '@/lib/supabase/client';
import type { UploadMetadata } from '@/store/upload-store';
import type { Sample } from '@/lib/types';

export class SampleService {
  private supabase = createClient();

  async createSample(metadata: UploadMetadata, storagePath: string, userId: string): Promise<Sample> {
    const { data, error } = await this.supabase
      .from('samples')
      .insert({
        uploader_id: userId,
        project_id: metadata.project_id || null,
        file_name: metadata.file_name,
        storage_url: storagePath,
        ecosystem: metadata.ecosystem,
        visibility: metadata.visibility,
        upload_status: 'pending',
        coordinates: metadata.coordinates ? `POINT(${metadata.coordinates.lng} ${metadata.coordinates.lat})` : null
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create sample record: ${error.message}`);
    }

    return data;
  }
}

export const sampleService = new SampleService();
