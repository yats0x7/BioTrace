import { createClient } from '@/lib/supabase/client';
import type { Identification, Sample } from '@/lib/types';

export class ResultsService {
  private supabase = createClient();

  async getRecentSamples(): Promise<Sample[]> {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await this.supabase
      .from('samples')
      .select('*')
      .eq('uploader_id', user.id)
      .order('uploaded_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch samples: ${error.message}`);
    }

    return data as any;
  }
  
  async getRecentIdentifications(): Promise<(Identification & { samples: Sample })[]> {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await this.supabase
      .from('identifications')
      .select(`*, samples (*)`)
      .eq('samples.uploader_id', user.id)
      .order('identified_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch results: ${error.message}`);
    }

    return (data || []).filter(item => item.samples) as any;
  }

  async getIdentificationsBySampleId(sampleId: string): Promise<{ sample: Sample, identifications: Identification[] } | null> {
    // 1. Fetch the sample
    const { data: sampleData, error: sampleError } = await this.supabase
      .from('samples')
      .select('*')
      .eq('id', sampleId)
      .single();
      
    if (sampleError) {
      if (sampleError.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch sample: ${sampleError.message}`);
    }

    // 2. Fetch all identifications for this sample
    const { data: idData, error: idError } = await this.supabase
      .from('identifications')
      .select('*')
      .eq('sample_id', sampleId)
      .order('confidence', { ascending: false });

    if (idError) {
      throw new Error(`Failed to fetch identifications: ${idError.message}`);
    }

    return {
      sample: sampleData as Sample,
      identifications: idData as Identification[]
    };
  }
}

export const resultsService = new ResultsService();
