import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { StatCard } from '@/components/ui/StatCard';
import { AddCollectionModal } from '@/components/modals/AddCollectionModal';
import { ViewReceiptModal } from '@/components/modals/ViewReceiptModal';
import { Plus, Search, Filter, Download, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const initialCollections = [
  { id: 1, type: '25% Remittance', source: 'Greater Accra Conference', amount: 45000, date: '2024-01-15', status: 'completed' },
  { id: 2, type: 'Faith Seed Initiative', source: 'Ashanti Conference', amount: 32500, date: '2024-01-14', status: 'completed' },
  { id: 3, type: 'Love Feast', source: 'Accra Central District', amount: 8500, date: '2024-01-13', status: 'completed' },
  { id: 4, type: "Founder's Day", source: 'All Conferences', amount: 125000, date: '2024-01-12', status: 'completed' },
  { id: 5, type: 'General Donation', source: 'Tema District', amount: 12000, date: '2024-01-11', status: 'pending' },
  { id: 6, type: '25% Remittance', source: 'Western Conference', amount: 28000, date: '2024-01-10', status: 'completed' },
];

const Collections: React.FC = () => {
  const [collections, setCollections] = useState(initialCollections);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  const handleAddCollection = (newCollection: any) => {
    setCollections([newCollection, ...collections]);
  };

  const handleViewReceipt = (collection: any) => {
    setSelectedCollection(collection);
    setIsReceiptModalOpen(true);
  };

  const handleExport = () => {
    toast.success('Exporting collections data...');
  };

  return (
    <DashboardLayout
      title="Collections & Remittances"
      subtitle="Track all church collections and remittances"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Collections (Jan)"
          value="GH₵ 245,680"
          change="+18% from December"
          changeType="positive"
        />
        <StatCard
          title="25% Remittances"
          value="GH₵ 156,200"
          change="+12% from last month"
          changeType="positive"
        />
        <StatCard
          title="Special Offerings"
          value="GH₵ 89,480"
          change="+25% increase"
          changeType="positive"
        />
        <StatCard
          title="Pending Payments"
          value="GH₵ 12,000"
          change="2 awaiting confirmation"
          changeType="neutral"
        />
      </div>

      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex gap-3 flex-1 max-w-lg">
          <FloatInput
            placeholder="Search collections..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <div className="flex gap-3">
          <FloatButton variant="outline" leftIcon={<Download className="w-4 h-4" />} onClick={handleExport}>
            Export
          </FloatButton>
          <FloatButton variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
            Record Collection
          </FloatButton>
        </div>
      </div>

      {/* Collections Table */}
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {collections.map((collection) => (
                <tr key={collection.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-light text-success">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-foreground">{collection.type}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{collection.source}</td>
                  <td className="font-semibold text-foreground">
                    GH₵ {collection.amount.toLocaleString()}
                  </td>
                  <td className="text-muted-foreground">{collection.date}</td>
                  <td>
                    <FloatBadge variant={collection.status === 'completed' ? 'success' : 'warning'}>
                      {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                    </FloatBadge>
                  </td>
                  <td>
                    <FloatButton variant="ghost" size="sm" onClick={() => handleViewReceipt(collection)}>
                      View Receipt
                    </FloatButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatCard>

      <AddCollectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCollection}
      />

      <ViewReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        collection={selectedCollection}
      />
    </DashboardLayout>
  );
};

export default Collections;
