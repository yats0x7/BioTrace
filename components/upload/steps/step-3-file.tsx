import React, { useRef, useState } from 'react';
import { useUploadWizard } from '@/hooks/use-upload';
import { UploadCloud, File as FileIcon, X, Type, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUploadStore } from '@/store/upload-store';

const ACCEPTED_FORMATS = ['.fasta', '.fastq', '.csv', '.txt'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const SEQUENCE_REGEX = /^[ACGTUNRYSWKMBDHV\s\n]+$/i;

export function Step3File() {
  const { 
    selectedFile, setFile, prevStep, nextStep 
  } = useUploadWizard();
  
  const { 
    uploadMethod, setUploadMethod, 
    sequenceString, setSequenceString,
    mlParams, setMlParams 
  } = useUploadStore();

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    setError(null);
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!ACCEPTED_FORMATS.includes(ext)) {
      setError(`Invalid file format. Accepted formats: ${ACCEPTED_FORMATS.join(', ')}`);
      return false;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds the 50MB limit.');
      return false;
    }
    
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setFile(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setFile(file);
      }
    }
  };

  const handleSequenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setSequenceString(val);
    if (val.trim() === '') {
      setError(null);
    } else if (!SEQUENCE_REGEX.test(val)) {
      setError("Sequence contains invalid characters. Only IUPAC nucleotide codes are allowed.");
    } else {
      setError(null);
    }
  };

  const isNextDisabled = () => {
    if (uploadMethod === 'file') return !selectedFile;
    if (uploadMethod === 'sequence') return sequenceString.trim() === '' || error !== null;
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">Provide Sample Data</h3>
        <p className="text-sm text-muted-foreground">
          Upload an eDNA file (FASTA) or paste your sequence directly.
        </p>
      </div>

      {/* Segmented Toggle */}
      <div className="flex p-1 bg-muted/50 rounded-lg border w-full max-w-sm">
        <button
          type="button"
          onClick={() => setUploadMethod('file')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all",
            uploadMethod === 'file' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <UploadCloud className="h-4 w-4" /> File
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('sequence')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all",
            uploadMethod === 'sequence' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Type className="h-4 w-4" /> Sequence
        </button>
      </div>

      {uploadMethod === 'file' ? (
        // File Upload UI
        <>
          {!selectedFile ? (
            <div 
              className={cn(
                "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer min-h-[250px]",
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50",
                error ? "border-destructive/50 bg-destructive/5" : ""
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={inputRef} 
                onChange={handleChange} 
                className="hidden" 
                accept={ACCEPTED_FORMATS.join(',')} 
              />
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-base font-semibold mb-1">Click to upload or drag and drop</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Accepted formats: {ACCEPTED_FORMATS.join(', ')}
              </p>
              {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            </div>
          ) : (
            <div className="border rounded-xl p-6 bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm line-clamp-1">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setFile(null)}
                className="p-2 hover:bg-destructive/10 text-destructive rounded-full transition-colors"
                title="Remove file"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        // Sequence Paste UI
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={sequenceString}
              onChange={handleSequenceChange}
              placeholder="Paste raw nucleotide sequence here (e.g. ATGCGT...)"
              className={cn(
                "w-full h-48 rounded-xl border bg-card p-4 text-sm font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-none",
                error ? "border-destructive/50 focus-visible:ring-destructive" : ""
              )}
            />
            {error && <p className="text-sm text-destructive font-medium mt-1">{error}</p>}
          </div>
          
          <div className="p-4 rounded-xl border bg-muted/20 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium">
              <Settings2 className="h-4 w-4 text-muted-foreground" /> ML Prediction Parameters
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Confidence Threshold</label>
                <input 
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={mlParams.threshold}
                  onChange={(e) => setMlParams({ threshold: parseFloat(e.target.value) })}
                  className="w-full h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Confusion Gap</label>
                <input 
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={mlParams.gap}
                  onChange={(e) => setMlParams({ gap: parseFloat(e.target.value) })}
                  className="w-full h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4 border-t">
        <button 
          type="button"
          onClick={prevStep}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back
        </button>
        
        <button 
          type="button"
          onClick={() => {
            // Generate virtual file if sequence mode
            if (uploadMethod === 'sequence' && sequenceString.trim() !== '') {
              const file = new File([sequenceString.trim()], 'pasted_sequence.fasta', { type: 'text/plain' });
              setFile(file);
            }
            nextStep();
          }}
          disabled={isNextDisabled()}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Review Data
        </button>
      </div>
    </div>
  );
}
