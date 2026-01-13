import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { AddPaymentModal } from '@/components/modals/AddPaymentModal';
import { ViewPaymentModal } from '@/components/modals/ViewPaymentModal';
import { Plus, Search, Filter, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const initialPayments = [
  { id: 1, reference: 'PAY-2024-001', payer: 'Zion AME Osu', amount: 5000, method: 'Mobile Money', date: '2024-01-15', status: 'completed' },
  { id: 2, reference: 'PAY-2024-002', payer: 'Wesley AME Tema', amount: 3500, method: 'Bank Transfer', date: '2024-01-14', status: 'completed' },
  { id: 3, reference: 'PAY-2024-003', payer: 'Trinity AME Kumasi', amount: 7200, method: 'Mobile Money', date: '2024-01-13', status: 'pending' },
  { id: 4, reference: 'PAY-2024-004', payer: 'Grace AME Cape Coast', amount: 2800, method: 'Cash', date: '2024-01-12', status: 'completed' },
  { id: 5, reference: 'PAY-2024-005', payer: 'Faith AME Tamale', amount: 4100, method: 'Bank Transfer', date: '2024-01-11', status: 'failed' },
];

const Payments: React.FC = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const handleAddPayment = (newPayment: any) => {
    setPayments([newPayment, ...payments]);
  };

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment);
    setIsViewModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success' as const;
      case 'pending':
        return 'warning' as const;
      case 'failed':
        return 'destructive' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <DashboardLayout
      title="Payment Records"
      subtitle="Track all payments and transactions"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Payments', value: '1,245', icon: <CreditCard className="w-5 h-5" /> },
          { label: 'Completed', value: '1,180', icon: <CheckCircle className="w-5 h-5 text-success" /> },
          { label: 'Pending', value: '52', icon: <Clock className="w-5 h-5 text-warning" /> },
          { label: 'Failed', value: '13', icon: <AlertCircle className="w-5 h-5 text-destructive" /> },
        ].map((stat) => (
          <FloatCard key={stat.label} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </FloatCard>
        ))}
      </div>

      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex gap-3 flex-1 max-w-lg">
          <FloatInput
            placeholder="Search payments..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <FloatButton variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
          Record Payment
        </FloatButton>
      </div>

      {/* Payments Table */}
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Payer</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="font-mono text-sm text-foreground">{payment.reference}</td>
                  <td className="text-foreground">{payment.payer}</td>
                  <td className="font-semibold text-foreground">
                    GH₵ {payment.amount.toLocaleString()}
                  </td>
                  <td className="text-muted-foreground">{payment.method}</td>
                  <td className="text-muted-foreground">{payment.date}</td>
                  <td>
                    <FloatBadge variant={getStatusVariant(payment.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </FloatBadge>
                  </td>
                  <td>
                    <FloatButton variant="ghost" size="sm" onClick={() => handleViewPayment(payment)}>
                      Details
                    </FloatButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatCard>

      <AddPaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPayment}
      />

      <ViewPaymentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        payment={selectedPayment}
      />
    </DashboardLayout>
  );
};

export default Payments;
