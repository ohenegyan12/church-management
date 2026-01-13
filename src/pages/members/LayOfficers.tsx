import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { AddLayOfficerModal } from '@/components/modals/AddLayOfficerModal';
import { Plus, Search, Filter, UserCheck } from 'lucide-react';

const initialLayOfficers = [
  { id: 1, name: 'Bro. Kofi Asante', position: 'Steward', society: 'Zion AME Osu', since: '2018', status: 'active' },
  { id: 2, name: 'Sis. Ama Darko', position: 'Class Leader', society: 'Wesley AME Tema', since: '2020', status: 'active' },
  { id: 3, name: 'Bro. Yaw Mensah', position: 'Trustee', society: 'Trinity AME Kumasi', since: '2015', status: 'active' },
  { id: 4, name: 'Sis. Akua Owusu', position: 'Stewardess', society: 'Grace AME Cape Coast', since: '2019', status: 'active' },
  { id: 5, name: 'Bro. Kwame Boateng', position: 'Lay Delegate', society: 'Faith AME Tamale', since: '2021', status: 'active' },
];

const LayOfficers: React.FC = () => {
  const navigate = useNavigate();
  const [layOfficers, setLayOfficers] = useState(initialLayOfficers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddOfficer = (newOfficer: any) => {
    setLayOfficers([...layOfficers, newOfficer]);
  };

  return (
    <DashboardLayout
      title="Lay Officers"
      subtitle="Manage stewards, class leaders, trustees, and other lay officers"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Officers', value: '3,456', color: 'bg-primary-light text-primary' },
          { label: 'Stewards', value: '892', color: 'bg-secondary-light text-secondary' },
          { label: 'Class Leaders', value: '1,247', color: 'bg-accent-light text-accent' },
          { label: 'Trustees', value: '418', color: 'bg-success-light text-success' },
        ].map((stat) => (
          <FloatCard key={stat.label} className="text-center">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} mb-2`}>
              <UserCheck className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </FloatCard>
        ))}
      </div>

      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex gap-3 flex-1 max-w-lg">
          <FloatInput
            placeholder="Search lay officers..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <FloatButton variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
          Add Lay Officer
        </FloatButton>
      </div>

      {/* Table */}
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Society</th>
                <th>Since</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {layOfficers.map((officer) => (
                <tr key={officer.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-foreground">{officer.name}</span>
                    </div>
                  </td>
                  <td>
                    <FloatBadge variant="outline">{officer.position}</FloatBadge>
                  </td>
                  <td className="text-muted-foreground">{officer.society}</td>
                  <td className="text-muted-foreground">{officer.since}</td>
                  <td>
                    <FloatBadge variant={officer.status === 'active' ? 'success' : 'default'}>
                      {officer.status.charAt(0).toUpperCase() + officer.status.slice(1)}
                    </FloatBadge>
                  </td>
                  <td>
                    <FloatButton 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/members/lay-officers/${officer.id}`)}
                    >
                      View
                    </FloatButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatCard>

      <AddLayOfficerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddOfficer}
      />
    </DashboardLayout>
  );
};

export default LayOfficers;
