import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { X, User } from 'lucide-react';
import { toast } from 'sonner';

interface AddClergyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (clergy: any) => void;
}

const AddClergyModal: React.FC<AddClergyModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    assignment: '',
    assignmentType: 'society',
    ordained: '',
    email: '',
    phone: '',
    status: 'active',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const newClergy: any = {
        id: Date.now(),
        name: formData.name,
        title: formData.title,
        ordained: formData.ordained,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
      };
      
      if (formData.assignmentType === 'conference') {
        newClergy.conference = formData.assignment;
      } else if (formData.assignmentType === 'district') {
        newClergy.district = formData.assignment;
      } else {
        newClergy.society = formData.assignment;
      }
      
      onAdd(newClergy);
      setIsLoading(false);
      toast.success('Clergy member added successfully');
      onClose();
      setFormData({
        name: '',
        title: '',
        assignment: '',
        assignmentType: 'society',
        ordained: '',
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Add New Clergy</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FloatInput
            label="Full Name"
            placeholder="Rev. John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
            <select
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select title</option>
              <option value="Bishop">Bishop</option>
              <option value="Presiding Elder">Presiding Elder</option>
              <option value="Pastor">Pastor</option>
              <option value="Deacon">Deacon</option>
              <option value="Elder">Elder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Assignment Type</label>
            <select
              value={formData.assignmentType}
              onChange={(e) => setFormData({ ...formData, assignmentType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="society">Society</option>
              <option value="district">District</option>
              <option value="conference">Conference</option>
            </select>
          </div>
          
          <FloatInput
            label="Assignment"
            placeholder="Enter assignment location"
            value={formData.assignment}
            onChange={(e) => setFormData({ ...formData, assignment: e.target.value })}
            required
          />
          
          <FloatInput
            label="Year Ordained"
            placeholder="e.g., 2010"
            value={formData.ordained}
            onChange={(e) => setFormData({ ...formData, ordained: e.target.value })}
            required
          />
          
          <FloatInput
            label="Email"
            type="email"
            placeholder="clergy@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <FloatInput
            label="Phone Number"
            placeholder="+233 XX XXX XXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="retired">Retired</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading}>
              Add Clergy
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { AddClergyModal };
