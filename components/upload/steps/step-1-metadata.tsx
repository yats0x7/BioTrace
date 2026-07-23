import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUploadWizard } from '@/hooks/use-upload';
import { useProjects } from '@/hooks/use-projects';

const schema = z.object({
  file_name: z.string().min(3, "File name must be at least 3 characters").max(100),
  project_id: z.string().optional().nullable(),
  ecosystem: z.string().min(2, "Ecosystem is required"),
  visibility: z.enum(['public', 'private']),
});

type FormData = z.infer<typeof schema>;

export function Step1Metadata() {
  const { metadata, updateMetadata, nextStep } = useUploadWizard();
  const { data: projects } = useProjects();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      file_name: metadata.file_name,
      project_id: metadata.project_id || '',
      ecosystem: metadata.ecosystem || '',
      visibility: metadata.visibility,
    }
  });

  const onSubmit = (data: FormData) => {
    updateMetadata({
      file_name: data.file_name,
      project_id: data.project_id || null,
      ecosystem: data.ecosystem,
      visibility: data.visibility,
    });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Sample Name</label>
          <input 
            {...register('file_name')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="e.g. River_Amazon_001" 
          />
          {errors.file_name && <p className="text-sm text-destructive mt-1">{errors.file_name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ecosystem</label>
          <input 
            {...register('ecosystem')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="e.g. Freshwater River" 
          />
          {errors.ecosystem && <p className="text-sm text-destructive mt-1">{errors.ecosystem.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Project (Optional)</label>
          <select 
            {...register('project_id')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">-- No Project --</option>
            {projects?.filter(p => p.is_member).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Visibility</label>
          <select 
            {...register('visibility')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="public">Public (Visible to everyone)</option>
            <option value="private">Private (Only you and project members)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button 
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Continue to Location
        </button>
      </div>
    </form>
  );
}
