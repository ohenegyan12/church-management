import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { X, Home } from 'lucide-react';
import { toast } from 'sonner';

interface AddSocietyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (society: any) => void;
}

const AddSocietyModal: React.FC<AddSocietyModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    pastor: '',
    address: '',
    phone: '',
    email: '',
    members: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onAdd({
        id: Date.now(),
        ...formData,
        members: parseInt(formData.members) || 0,
      });
      setIsLoading(false);
      toast.success('Society added successfully');
      onClose();
      setFormData({
        name: '',
        district: '',
        pastor: '',
        address: '',
        phone: '',
        email: '',
        members: '',
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Home className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Add New Society</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FloatInput
            label="Society Name"
            placeholder="Enter society name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">District</label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select district</option>
              <option value="Accra Central">Accra Central</option>
              <option value="Tema">Tema</option>
              <option value="Kumasi Metro">Kumasi Metro</option>
              <option value="Cape Coast">Cape Coast</option>
              <option value="Tamale">Tamale</option>
              <option value="Takoradi">Takoradi</option>
            </select>
          </div>
          
          <FloatInput
            label="Pastor Name"
            placeholder="Enter pastor's name"
            value={formData.pastor}
            onChange={(e) => setFormData({ ...formData, pastor: e.target.value })}
            required
          />
          
          <FloatInput
            label="Address"
            placeholder="Enter society address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
          
          <FloatInput
            label="Phone Number"
            placeholder="+233 XX XXX XXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          
          <FloatInput
            label="Email"
            type="email"
            placeholder="society@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          
          <FloatInput
            label="Number of Members"
            type="number"
            placeholder="0"
            value={formData.members}
            onChange={(e) => setFormData({ ...formData, members: e.target.value })}
          />
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading}>
              Add Society
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { AddSocietyModal };
