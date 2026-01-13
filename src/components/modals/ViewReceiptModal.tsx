import React from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { X, Wallet, Download, Printer, Calendar, Building2, Receipt } from 'lucide-react';
import { toast } from 'sonner';

interface ViewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: any;
}

const ViewReceiptModal: React.FC<ViewReceiptModalProps> = ({ isOpen, onClose, collection }) => {
  if (!isOpen || !collection) return null;

  const handlePrint = () => {
    window.print();
    toast.success('Printing receipt...');
  };

  const handleDownload = () => {
    toast.success('Receipt downloaded successfully');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-light text-success">
              <Receipt className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Collection Receipt</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Receipt Header */}
          <div className="text-center mb-6 pb-6 border-b border-dashed border-border">
            <h3 className="text-xl font-bold text-foreground font-display">AME Zion Church Ghana</h3>
            <p className="text-sm text-muted-foreground">Official Collection Receipt</p>
            <p className="text-xs text-muted-foreground mt-1">Receipt #{collection.id}</p>
          </div>

          {/* Receipt Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Wallet className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Collection Type</p>
                <p className="font-medium text-foreground">{collection.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Building2 className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Source</p>
                <p className="font-medium text-foreground">{collection.source}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{collection.date}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-success-light text-center">
              <p className="text-sm text-success">Amount Received</p>
              <p className="text-3xl font-bold text-success font-display">
                GH₵ {collection.amount.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-center">
              <FloatBadge variant={collection.status === 'completed' ? 'success' : 'warning'}>
                {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
              </FloatBadge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-border">
            <FloatButton 
              type="button" 
              variant="outline" 
              className="flex-1" 
              leftIcon={<Printer className="w-4 h-4" />}
              onClick={handlePrint}
            >
              Print
            </FloatButton>
            <FloatButton 
              type="button" 
              variant="primary" 
              className="flex-1" 
              leftIcon={<Download className="w-4 h-4" />}
              onClick={handleDownload}
            >
              Download
            </FloatButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewReceiptModal };
