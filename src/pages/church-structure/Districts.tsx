import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { Plus, Search, Filter, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AddDistrictModal } from '@/components/modals/AddDistrictModal';

const districts = [
  { id: 1, name: 'Accra Central District', conference: 'Greater Accra', superintendent: 'Rev. John Mensah', societies: 18, members: 2450 },
  { id: 2, name: 'Tema District', conference: 'Greater Accra', superintendent: 'Rev. Grace Asante', societies: 14, members: 1890 },
  { id: 3, name: 'Kumasi Metropolitan District', conference: 'Ashanti', superintendent: 'Rev. Peter Owusu', societies: 22, members: 3200 },
  { id: 4, name: 'Cape Coast District', conference: 'Central Region', superintendent: 'Rev. Mary Aidoo', societies: 16, members: 2100 },
  { id: 5, name: 'Tamale District', conference: 'Northern', superintendent: 'Rev. Ibrahim Mohammed', societies: 12, members: 1560 },
  { id: 6, name: 'Takoradi District', conference: 'Western', superintendent: 'Rev. Samuel Eshun', societies: 15, members: 1980 },
];

const Districts: React.FC = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <DashboardLayout
      title="Districts"
      subtitle="View and manage all districts across conferences"
    >
      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Districts', value: '28' },
          { label: 'Total Societies', value: '418' },
          { label: 'Total Members', value: '50,820' },
          { label: 'Active Clergy', value: '1,247' },
        ].map((stat) => (
          <FloatCard key={stat.label} className="text-center py-6">
            <p className="text-3xl font-bold text-primary font-display">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </FloatCard>
        ))}
      </div>

      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex gap-3 flex-1 max-w-lg">
          <FloatInput
            placeholder="Search districts..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <FloatButton 
          variant="primary" 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add District
        </FloatButton>
      </div>

      {/* Table */}
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>District Name</th>
                <th>Conference</th>
                <th>Superintendent</th>
                <th>Societies</th>
                <th>Members</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {districts.map((district) => (
                <tr 
                  key={district.id} 
                  className="cursor-pointer"
                  onClick={() => navigate(`/church-structure/districts/${district.id}`)}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-foreground">{district.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{district.conference}</td>
                  <td className="text-muted-foreground">{district.superintendent}</td>
                  <td>
                    <span className="font-medium text-foreground">{district.societies}</span>
                  </td>
                  <td>
                    <span className="font-medium text-foreground">{district.members.toLocaleString()}</span>
                  </td>
                  <td>
                    <FloatBadge variant="success">Active</FloatBadge>
                  </td>
                  <td>
                    <FloatButton 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/church-structure/districts/${district.id}`);
                      }}
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

      {/* Add District Modal */}
      <AddDistrictModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </DashboardLayout>
  );
};

export default Districts;
