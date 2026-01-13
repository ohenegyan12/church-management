import React from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { X, CreditCard, Calendar, Building2, Hash, Banknote, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ViewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}

const ViewPaymentModal: React.FC<ViewPaymentModalProps> = ({ isOpen, onClose, payment }) => {
  if (!isOpen || !payment) return null;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success' as const;
      case 'pending': return 'warning' as const;
      case 'failed': return 'destructive' as const;
      default: return 'default' as const;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'failed': return <AlertCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Payment Details</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Payment Reference */}
          <div className="text-center mb-6 pb-6 border-b border-dashed border-border">
            <p className="text-sm text-muted-foreground">Reference Number</p>
            <p className="text-xl font-mono font-bold text-foreground">{payment.reference}</p>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Building2 className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Payer</p>
                <p className="font-medium text-foreground">{payment.payer}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Banknote className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium text-foreground">{payment.method}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{payment.date}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 text-center">
              <p className="text-sm text-primary">Amount</p>
              <p className="text-3xl font-bold text-primary font-display">
                GH₵ {payment.amount.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-center items-center gap-2 p-3 rounded-lg" 
                 style={{ 
                   backgroundColor: payment.status === 'completed' ? 'hsl(var(--success) / 0.1)' : 
                                   payment.status === 'pending' ? 'hsl(var(--warning) / 0.1)' : 
                                   'hsl(var(--destructive) / 0.1)' 
                 }}>
              {getStatusIcon(payment.status)}
              <FloatBadge variant={getStatusVariant(payment.status)}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </FloatBadge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-border">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Close
            </FloatButton>
            {payment.status === 'pending' && (
              <FloatButton type="button" variant="primary" className="flex-1">
                Confirm Payment
              </FloatButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewPaymentModal };
