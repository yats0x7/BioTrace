import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UploadStep = 1 | 2 | 3 | 4;

export interface UploadMetadata {
  file_name: string;
  project_id: string | null;
  ecosystem: string | null;
  visibility: 'public' | 'private';
  coordinates: { lat: number; lng: number } | null;
}

interface UploadStore {
  currentStep: UploadStep;
  metadata: UploadMetadata;
  selectedFile: File | null;
  isProcessing: boolean;
  uploadMethod: 'file' | 'sequence';
  sequenceString: string;
  mlParams: { threshold: number; gap: number };
  
  setStep: (step: UploadStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateMetadata: (data: Partial<UploadMetadata>) => void;
  setFile: (file: File | null) => void;
  setProcessing: (status: boolean) => void;
  setUploadMethod: (method: 'file' | 'sequence') => void;
  setSequenceString: (seq: string) => void;
  setMlParams: (params: Partial<{ threshold: number; gap: number }>) => void;
  reset: () => void;
}

const initialMetadata: UploadMetadata = {
  file_name: '',
  project_id: null,
  ecosystem: '',
  visibility: 'private',
  coordinates: null,
};

export const useUploadStore = create<UploadStore>()((set) => ({
  currentStep: 1,
  metadata: initialMetadata,
  selectedFile: null,
  isProcessing: false,
  uploadMethod: 'file',
  sequenceString: '',
  mlParams: { threshold: 0.3, gap: 0.15 },

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) as UploadStep })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) as UploadStep })),
  updateMetadata: (data) => set((state) => ({ metadata: { ...state.metadata, ...data } })),
  setFile: (file) => set({ selectedFile: file }),
  setProcessing: (status) => set({ isProcessing: status }),
  setUploadMethod: (method) => set({ uploadMethod: method }),
  setSequenceString: (seq) => set({ sequenceString: seq }),
  setMlParams: (params) => set((state) => ({ mlParams: { ...state.mlParams, ...params } })),
  reset: () => set({ 
    currentStep: 1, 
    metadata: initialMetadata, 
    selectedFile: null, 
    isProcessing: false,
    uploadMethod: 'file',
    sequenceString: '',
    mlParams: { threshold: 0.3, gap: 0.15 }
  }),
}));
