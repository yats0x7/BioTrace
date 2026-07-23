import { createClient } from '@/lib/supabase/client';

export class StorageService {
  private supabase = createClient();
  private bucketName = 'edna-files';

  async uploadFile(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Storage error: ${error.message}`);
    }

    // Get public URL or just store path. Since it's private, we just store the path and use signed URLs or direct auth download later.
    return data.path;
  }

  async getFileUrl(path: string): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .createSignedUrl(path, 60 * 60); // 1 hour

    if (error) throw error;
    return data.signedUrl;
  }
}

export const storageService = new StorageService();
