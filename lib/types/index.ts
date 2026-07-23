export interface User {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  contributor_level: number;
  total_uploads: number;
  total_identifications: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  visibility: 'public' | 'private';
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Sample {
  id: string;
  uploader_id: string;
  project_id: string | null;
  file_name: string;
  storage_url: string;
  coordinates: any; // PostGIS geography point
  ecosystem: string | null;
  upload_status: 'pending' | 'processing' | 'completed' | 'failed';
  visibility: 'public' | 'private';
  uploaded_at: string;
  updated_at: string;
}

export interface Identification {
  id: string;
  sample_id: string;
  scientific_name: string;
  confidence: number | null;
  processing_status: 'pending' | 'completed' | 'failed';
  identified_at: string;
  updated_at: string;
  sequence_id: string | null;
  is_confident: boolean;
  is_confused: boolean;
  top_candidates: Array<{ species: string; confidence: number }> | null;
  species_details: any | null;
  raw_response: any | null;
}

export interface Observation {
  id: string;
  project_id: string | null;
  user_id: string | null;
  sample_id: string | null;
  identification_id: string | null;
  scientific_name: string | null;
  notes: string | null;
  observed_at: string;
}

export interface SpeciesCache {
  scientific_name: string;
  common_name: string | null;
  description: string | null;
  ai_summary: string | null;
  habitat: string | null;
  threats: string | null;
  protection_status: string | null;
  taxonomy_json: any;
  image_url: string | null;
  wikipedia_url: string | null;
  gbif_json: any;
  last_updated: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  link_url: string | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  created_at: string;
}

export interface Alert {
  id: string;
  alert_type: 'rare_species' | 'threat' | 'system';
  title: string;
  message: string;
  observation_id: string | null;
  is_active: boolean;
  created_at: string;
}

export interface MLSpeciesDetails {
  species: string;
  common_name: string;
  order: string;
  family: string;
  genus: string;
  habitat: string;
  geographic_range: string;
  conservation_status: string;
  description: string;
  sequence_count: number;
}

export interface MLSequenceResult {
  predicted_species: string;
  confidence: number;
  is_confident: boolean;
  is_confused: boolean;
  top_candidates: Array<{ species: string; confidence: number }>;
  species_details: MLSpeciesDetails;
}

export interface MLPredictionItem {
  id: string;
  result: MLSequenceResult | null;
  error: string | null;
}

export interface MLPredictionResponse {
  total_sequences: number;
  results: MLPredictionItem[];
}

export interface AnalyzeRequestPayload {
  sampleId: string;
  storageUrl?: string; // Optional because sequenceString might be provided
  sequenceString?: string;
  threshold?: number;
  gap?: number;
}
