import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { X, MapPin } from 'lucide-react';

interface DistrictData {
  id: number;
  name: string;
  conference: string;
  superintendent: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string;
}

interface EditDistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
  district: DistrictData | null;
}

const EditDistrictModal: React.FC<EditDistrictModalProps> = ({ isOpen, onClose, district }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !district) return null;

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
            <h2 className="text-lg font-semibold text-foreground font-display">Edit District</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <FloatInput label="District Name" defaultValue={district.name} required />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Conference</label>
            <select 
              defaultValue={district.conference}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Greater Accra">Greater Accra Conference</option>
              <option value="Ashanti">Ashanti Conference</option>
              <option value="Central Region">Central Region Conference</option>
              <option value="Northern">Northern Conference</option>
              <option value="Western">Western Conference</option>
            </select>
          </div>
          <FloatInput label="District Superintendent" defaultValue={district.superintendent} required />
          <FloatInput label="Headquarters Address" defaultValue={district.address} />
          <div className="grid grid-cols-2 gap-4">
            <FloatInput label="Phone Number" defaultValue={district.phone} />
            <FloatInput label="Email Address" type="email" defaultValue={district.email} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
            <select 
              defaultValue={district.status || 'active'}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading}>
              Save Changes
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { EditDistrictModal };
