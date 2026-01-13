import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { X, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface AddLayOfficerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (officer: any) => void;
}

const AddLayOfficerModal: React.FC<AddLayOfficerModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    society: '',
    since: '',
    email: '',
    phone: '',
    status: 'active',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onAdd({
        id: Date.now(),
        ...formData,
      });
      setIsLoading(false);
      toast.success('Lay Officer added successfully');
      onClose();
      setFormData({
        name: '',
        position: '',
        society: '',
        since: '',
        email: '',
        phone: '',
        status: 'active',
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Add Lay Officer</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FloatInput
            label="Full Name"
            placeholder="Bro./Sis. Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Position</label>
            <select
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select position</option>
              <option value="Steward">Steward</option>
              <option value="Stewardess">Stewardess</option>
              <option value="Class Leader">Class Leader</option>
              <option value="Trustee">Trustee</option>
              <option value="Lay Delegate">Lay Delegate</option>
              <option value="Sunday School Superintendent">Sunday School Superintendent</option>
              <option value="Choir Director">Choir Director</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Society</label>
            <select
              value={formData.society}
              onChange={(e) => setFormData({ ...formData, society: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select society</option>
              <option value="Zion AME Osu">Zion AME Osu</option>
              <option value="Wesley AME Tema">Wesley AME Tema</option>
              <option value="Trinity AME Kumasi">Trinity AME Kumasi</option>
              <option value="Grace AME Cape Coast">Grace AME Cape Coast</option>
              <option value="Faith AME Tamale">Faith AME Tamale</option>
              <option value="Hope AME Takoradi">Hope AME Takoradi</option>
            </select>
          </div>
          
          <FloatInput
            label="Year Appointed"
            placeholder="e.g., 2020"
            value={formData.since}
            onChange={(e) => setFormData({ ...formData, since: e.target.value })}
            required
          />
          
          <FloatInput
            label="Email"
            type="email"
            placeholder="officer@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          
          <FloatInput
            label="Phone Number"
            placeholder="+233 XX XXX XXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              Add Officer
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { AddLayOfficerModal };
