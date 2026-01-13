import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { AddClergyModal } from '@/components/modals/AddClergyModal';
import { Plus, Search, Filter, User } from 'lucide-react';

const initialClergy = [
  { id: 1, name: 'Rt. Rev. Emmanuel Asante', title: 'Bishop', conference: 'Greater Accra', ordained: '1995', status: 'active', email: 'e.asante@amezion.gh', phone: '+233 24 111 2222' },
  { id: 2, name: 'Rev. Dr. John Mensah', title: 'Presiding Elder', district: 'Accra Central', ordained: '2002', status: 'active', email: 'j.mensah@amezion.gh', phone: '+233 24 222 3333' },
  { id: 3, name: 'Rev. Grace Asante', title: 'Pastor', society: 'Wesley AME Church', ordained: '2010', status: 'active', email: 'g.asante@amezion.gh', phone: '+233 24 333 4444' },
  { id: 4, name: 'Rev. Peter Owusu', title: 'Presiding Elder', district: 'Kumasi Metro', ordained: '2000', status: 'active', email: 'p.owusu@amezion.gh', phone: '+233 24 444 5555' },
  { id: 5, name: 'Rev. Mary Aidoo', title: 'Pastor', society: 'Trinity AME Church', ordained: '2012', status: 'active', email: 'm.aidoo@amezion.gh', phone: '+233 24 555 6666' },
  { id: 6, name: 'Rev. Samuel Osei', title: 'Retired Bishop', conference: 'Central Region', ordained: '1985', status: 'retired', email: 's.osei@amezion.gh', phone: '+233 24 666 7777' },
];

const Clergy: React.FC = () => {
  const navigate = useNavigate();
  const [clergy, setClergy] = useState(initialClergy);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClergy = (newClergy: any) => {
    setClergy([...clergy, newClergy]);
  };

  return (
    <DashboardLayout
      title="Clergy Management"
      subtitle="Manage ordained ministers and their assignments"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Clergy', value: '1,247', color: 'bg-primary-light text-primary' },
          { label: 'Bishops', value: '5', color: 'bg-secondary-light text-secondary' },
          { label: 'Presiding Elders', value: '28', color: 'bg-accent-light text-accent' },
          { label: 'Pastors', value: '1,214', color: 'bg-success-light text-success' },
        ].map((stat) => (
          <FloatCard key={stat.label} className="text-center">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} mb-2`}>
              <User className="w-5 h-5" />
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
            placeholder="Search clergy..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <FloatButton variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
          Add Clergy
        </FloatButton>
      </div>

      {/* Clergy Table */}
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Assignment</th>
                <th>Ordained</th>
                <th>Contact</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clergy.map((person) => (
                <tr key={person.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {person.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{person.name}</p>
                        <p className="text-sm text-muted-foreground">{person.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <FloatBadge variant={person.title === 'Bishop' ? 'primary' : 'default'}>
                      {person.title}
                    </FloatBadge>
                  </td>
                  <td className="text-muted-foreground">
                    {person.conference || person.district || person.society}
                  </td>
                  <td className="text-muted-foreground">{person.ordained}</td>
                  <td className="text-muted-foreground">{person.phone}</td>
                  <td>
                    <FloatBadge variant={person.status === 'active' ? 'success' : 'default'}>
                      {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                    </FloatBadge>
                  </td>
                  <td>
                    <FloatButton 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/members/clergy/${person.id}`)}
                    >
                      View Profile
                    </FloatButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatCard>

      <AddClergyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddClergy}
      />
    </DashboardLayout>
  );
};

export default Clergy;
