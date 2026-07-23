'use client';

import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { EmptyState } from '@/components/shared/wrappers';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <EmptyState 
        title="Something went wrong!" 
        description={error.message || "An unexpected error occurred while loading this page."}
        icon={AlertTriangle}
        action={
          <button
            onClick={() => reset()}
            className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        }
      />
    </div>
  );
}
