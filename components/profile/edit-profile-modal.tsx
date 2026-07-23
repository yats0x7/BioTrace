'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    name: string;
    bio: string;
    institution: string;
    country: string;
  };
  onSave: (data: Partial<EditProfileModalProps['initialData']>) => void;
}

export function EditProfileModal({ isOpen, onClose, initialData, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border rounded-xl shadow-lg w-full max-w-md overflow-hidden relative">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Bio</label>
            <textarea 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Institution</label>
            <input 
              type="text" 
              value={formData.institution}
              onChange={(e) => setFormData({...formData, institution: e.target.value})}
              className="w-full h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Country</label>
            <input 
              type="text" 
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              className="w-full h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>
        <div className="p-4 border-t bg-muted/20 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
