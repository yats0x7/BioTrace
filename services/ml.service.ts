import type { MLPredictionResponse } from '@/lib/types';

export class MLService {
  async analyzeSample(
    sampleId: string, 
    storageUrl: string, 
    sequenceString?: string, 
    threshold?: number, 
    gap?: number
  ): Promise<MLPredictionResponse> {
    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        const payload: Record<string, any> = { sampleId, storageUrl };
        if (sequenceString) payload.sequenceString = sequenceString;
        if (threshold !== undefined) payload.threshold = threshold;
        if (gap !== undefined) payload.gap = gap;

        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to analyze sample');
        }

        return await response.json();
      } catch (error) {
        attempt++;
        if (attempt > maxRetries) {
          throw error;
        }
        // Exponential backoff before retry (1s, 2s)
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
    
    throw new Error('Analysis failed after maximum retries');
  }
}

export const mlService = new MLService();
