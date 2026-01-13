import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { X, Wallet } from 'lucide-react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-light text-success">
              <Wallet className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Record Payment</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Payment Type</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>25% Remittance</option>
              <option>Faith Seed Initiative</option>
              <option>Love Feast</option>
              <option>Founder's Day</option>
              <option>General Donation</option>
            </select>
          </div>
          <FloatInput label="Amount (GH₵)" type="number" placeholder="0.00" required />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Source</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Select source...</option>
              <option>Greater Accra Conference</option>
              <option>Ashanti Conference</option>
              <option>Central Region Conference</option>
              <option>Accra Central District</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Payment Method</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Mobile Money</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Cheque</option>
            </select>
          </div>
          <FloatInput label="Reference Number" placeholder="Optional" />
          <FloatInput label="Date" type="date" required />
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading}>
              Record Payment
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { RecordPaymentModal };
