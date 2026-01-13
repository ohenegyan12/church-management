import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { AddSocietyModal } from '@/components/modals/AddSocietyModal';
import { Plus, Search, Filter, Home, Users, MapPin, Phone, Mail } from 'lucide-react';

const initialSocieties = [
  { id: 1, name: 'Zion AME Church Osu', district: 'Accra Central', pastor: 'Rev. Emmanuel Darko', members: 450, address: 'Oxford Street, Osu', phone: '+233 24 123 4567' },
  { id: 2, name: 'Wesley AME Church Tema', district: 'Tema', pastor: 'Rev. Abigail Mensah', members: 320, address: 'Community 1, Tema', phone: '+233 24 234 5678' },
  { id: 3, name: 'Trinity AME Church Kumasi', district: 'Kumasi Metro', pastor: 'Rev. Kwesi Appiah', members: 580, address: 'Adum, Kumasi', phone: '+233 24 345 6789' },
  { id: 4, name: 'Grace AME Church Cape Coast', district: 'Cape Coast', pastor: 'Rev. Ama Osei', members: 290, address: 'Chapel Hill, Cape Coast', phone: '+233 24 456 7890' },
  { id: 5, name: 'Faith AME Church Tamale', district: 'Tamale', pastor: 'Rev. Yusuf Alhassan', members: 210, address: 'Lamashegu, Tamale', phone: '+233 24 567 8901' },
  { id: 6, name: 'Hope AME Church Takoradi', district: 'Takoradi', pastor: 'Rev. Isaac Gyamfi', members: 380, address: 'Market Circle, Takoradi', phone: '+233 24 678 9012' },
];

const Societies: React.FC = () => {
  const [societies, setSocieties] = useState(initialSocieties);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddSociety = (newSociety: any) => {
    setSocieties([...societies, newSociety]);
  };
  return (
    <DashboardLayout
      title="Local Societies"
      subtitle="View and manage all local churches (societies)"
    >
      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex gap-3 flex-1 max-w-lg">
          <FloatInput
            placeholder="Search societies..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <FloatButton variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
          Add Society
        </FloatButton>
      </div>

      {/* Societies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {societies.map((society, index) => (
          <FloatCard
            key={society.id}
            hover
            className="animate-slide-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground shrink-0">
                <Home className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground font-display truncate">
                  {society.name}
                </h3>
                <p className="text-sm text-muted-foreground">{society.district} District</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Pastor:</span>
                <span className="font-medium text-foreground">{society.pastor}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground truncate">{society.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{society.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-lg font-bold text-foreground font-display">{society.members}</span>
                <span className="text-sm text-muted-foreground">members</span>
              </div>
              <FloatBadge variant="success">Active</FloatBadge>
            </div>
          </FloatCard>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 6 of 418 societies
        </p>
        <div className="flex gap-2">
          <FloatButton variant="outline" size="sm" disabled>Previous</FloatButton>
          <FloatButton variant="outline" size="sm">Next</FloatButton>
        </div>
      </div>

      <AddSocietyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSociety}
      />
    </DashboardLayout>
  );
};

export default Societies;
