import React from 'react';
import { useUploadWizard } from '@/hooks/use-upload';
import { useDashboard } from '@/hooks/use-dashboard';
import { FileText, MapPin, FolderOpen, Globe, Lock } from 'lucide-react';

export function Step4Review() {
  const { metadata, selectedFile, prevStep, submitUpload } = useUploadWizard();
  const { projects } = useDashboard();

  const projectName = metadata.project_id 
    ? projects?.find(p => p.id === metadata.project_id)?.name || 'Unknown Project'
    : 'No Project';

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h3 className="text-lg font-medium">Review and Submit</h3>
        <p className="text-sm text-muted-foreground">
          Please review the details below before submitting. Once submitted, the file will be securely uploaded and queued for processing.
        </p>
      </div>

      <div className="bg-muted/30 rounded-xl border p-6 space-y-6">
        
        {/* File Detail */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <FileText className="h-4 w-4 mr-2" /> File Information
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Original File</p>
              <p className="font-medium truncate">{selectedFile?.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Size</p>
              <p className="font-medium">
                {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Sample Name</p>
              <p className="font-medium">{metadata.file_name}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-border w-full" />

        {/* Ecosystem & Project */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <FolderOpen className="h-4 w-4 mr-2" /> Metadata
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Ecosystem</p>
              <p className="font-medium capitalize">{metadata.ecosystem || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Project</p>
              <p className="font-medium">{projectName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Visibility</p>
              <p className="font-medium flex items-center capitalize">
                {metadata.visibility === 'public' ? (
                  <><Globe className="h-3 w-3 mr-1" /> Public</>
                ) : (
                  <><Lock className="h-3 w-3 mr-1" /> Private</>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-border w-full" />

        {/* Location */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <MapPin className="h-4 w-4 mr-2" /> Location
          </h4>
          <div className="text-sm">
            {metadata.coordinates ? (
              <p className="font-medium">
                Lat: {metadata.coordinates.lat.toFixed(5)}, Lng: {metadata.coordinates.lng.toFixed(5)}
              </p>
            ) : (
              <p className="text-muted-foreground italic">No location provided</p>
            )}
          </div>
        </div>

      </div>

      <div className="flex justify-between pt-4 border-t">
        <button 
          type="button"
          onClick={prevStep}
          disabled={submitUpload.isPending}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back
        </button>
        
        <button 
          type="button"
          onClick={() => submitUpload.mutate()}
          disabled={submitUpload.isPending}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {submitUpload.isPending ? 'Uploading...' : 'Submit Upload'}
        </button>
      </div>
    </div>
  );
}
