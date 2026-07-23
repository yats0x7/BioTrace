import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { AnalyzeRequestPayload, MLPredictionResponse } from '@/lib/types';

export const maxDuration = 300; // Allow up to 5 minutes for large FASTA processing on Vercel

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: AnalyzeRequestPayload = await request.json();

    if (!body.sampleId || !body.storageUrl) {
      return NextResponse.json({ error: 'Missing sample parameters' }, { status: 400 });
    }

    // 1. Update sample status to processing
    await supabase
      .from('samples')
      .update({ upload_status: 'processing' })
      .eq('id', body.sampleId)
      .eq('uploader_id', user.id);

    // 2. Branch based on sequence vs file
    const renderApiUrl = process.env.ML_API_URL || 'https://edna-species-detection.onrender.com';
    let mlResponse: MLPredictionResponse;

    if (body.sequenceString) {
      // SEQUENCE MODE (Single /predict)
      const endpoint = `${renderApiUrl}/predict`;
      
      const payload = {
        sequence: body.sequenceString,
        confidence_threshold: body.threshold || 0.30,
        confusion_gap: body.gap || 0.15
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ML API Error (${response.status}): ${errorText}`);
      }

      const result = await response.json();
      
      // Normalize single result to match MLPredictionResponse format
      mlResponse = {
        total_sequences: 1,
        results: [{
          id: 'seq1_pasted',
          result: result,
          error: null
        }]
      };

    } else {
      // FILE MODE (Batch /predict-batch)
      const { data: fileData, error: downloadError } = await supabase
        .storage
        .from('edna-files')
        .download(body.storageUrl!);

      if (downloadError || !fileData) {
        throw new Error(`Failed to download file from storage: ${downloadError?.message}`);
      }

      const formData = new FormData();
      formData.append('file', fileData, 'sequence.fasta');

      const endpoint = `${renderApiUrl}/predict-batch`;
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ML API Error (${response.status}): ${errorText}`);
      }

      mlResponse = await response.json();
    }

    // 5. Bulk Save predictions to identifications table
    const insertPayloads = mlResponse.results.map((item) => ({
      sample_id: body.sampleId,
      sequence_id: item.id,
      scientific_name: item.result?.predicted_species || 'Unknown',
      confidence: item.result?.confidence || 0,
      processing_status: item.error ? 'failed' : 'completed',
      is_confident: item.result?.is_confident || false,
      is_confused: item.result?.is_confused || false,
      top_candidates: item.result?.top_candidates || null,
      species_details: item.result?.species_details || null,
      raw_response: item // save the exact node response for debugging/records
    }));

    // If there are no results, create a failure record
    if (insertPayloads.length === 0) {
      await supabase.from('identifications').insert({
        sample_id: body.sampleId,
        scientific_name: 'No sequences found',
        confidence: 0,
        processing_status: 'failed',
        raw_response: mlResponse
      });
    } else {
      const { error: idError } = await supabase
        .from('identifications')
        .insert(insertPayloads);

      if (idError) {
        throw new Error(`Failed to save identifications: ${idError.message}`);
      }
    }

    // 6. Update sample status to completed
    await supabase
      .from('samples')
      .update({ upload_status: 'completed' })
      .eq('id', body.sampleId)
      .eq('uploader_id', user.id);

    // Return the identification result
    return NextResponse.json(mlResponse, { status: 200 });

  } catch (error: Error | unknown) {
    console.error('ML Analysis Error:', error);
    // Try to mark sample as failed if possible, though we don't await/block on it
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
