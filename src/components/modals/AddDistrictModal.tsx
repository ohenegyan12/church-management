import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { X, MapPin } from 'lucide-react';

interface AddDistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDistrictModal: React.FC<AddDistrictModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-lg mx-4 animate-scale-in max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Add New District</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <FloatInput label="District Name" placeholder="e.g., Accra Central District" required />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Conference</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select conference...</option>
              <option value="1">Greater Accra Conference</option>
              <option value="2">Ashanti Conference</option>
              <option value="3">Central Region Conference</option>
              <option value="4">Northern Conference</option>
              <option value="5">Western Conference</option>
            </select>
          </div>
          <FloatInput label="District Superintendent" placeholder="Rev. Name" required />
          <FloatInput label="Headquarters Address" placeholder="District office address" />
          <div className="grid grid-cols-2 gap-4">
            <FloatInput label="Phone Number" placeholder="+233 XX XXX XXXX" />
            <FloatInput label="Email Address" type="email" placeholder="district@amezion.gh" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading}>
              Add District
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { AddDistrictModal };
