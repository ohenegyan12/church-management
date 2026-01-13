import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { X, Wallet } from 'lucide-react';
import { toast } from 'sonner';

interface AddCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (collection: any) => void;
}

const AddCollectionModal: React.FC<AddCollectionModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    source: '',
    amount: '',
    date: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onAdd({
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount) || 0,
        status: 'pending',
      });
      setIsLoading(false);
      toast.success('Collection recorded successfully');
      onClose();
      setFormData({ type: '', source: '', amount: '', date: '', notes: '' });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-light text-success">
              <Wallet className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Record Collection</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Collection Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select type</option>
              <option value="25% Remittance">25% Remittance</option>
              <option value="Faith Seed Initiative">Faith Seed Initiative</option>
              <option value="Love Feast">Love Feast</option>
              <option value="Founder's Day">Founder's Day</option>
              <option value="General Donation">General Donation</option>
              <option value="Special Offering">Special Offering</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Source</label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select source</option>
              <option value="Greater Accra Conference">Greater Accra Conference</option>
              <option value="Ashanti Conference">Ashanti Conference</option>
              <option value="Western Conference">Western Conference</option>
              <option value="Central Conference">Central Conference</option>
              <option value="All Conferences">All Conferences</option>
              <option value="Accra Central District">Accra Central District</option>
              <option value="Tema District">Tema District</option>
            </select>
          </div>
          
          <FloatInput
            label="Amount (GH₵)"
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
          
          <FloatInput
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading}>
              Record Collection
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { AddCollectionModal };
