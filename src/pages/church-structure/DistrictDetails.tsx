import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { EditDistrictModal } from '@/components/modals/EditDistrictModal';
import { 
  MapPin, 
  ArrowLeft, 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  Edit,
  Home,
  TrendingUp,
  Church,
  ChevronRight
} from 'lucide-react';

const districtData: Record<string, {
  id: number;
  name: string;
  conference: string;
  superintendent: string;
  societies: number;
  members: number;
  status: string;
  email: string;
  phone: string;
  address: string;
  established: string;
}> = {
  '1': {
    id: 1,
    name: 'Accra Central District',
    conference: 'Greater Accra',
    superintendent: 'Rev. John Mensah',
    societies: 18,
    members: 2450,
    status: 'active',
    email: 'accracentral@amezion.gh',
    phone: '+233 30 222 1111',
    address: 'P.O. Box AC 100, Accra Central',
    established: '1968',
  },
  '2': {
    id: 2,
    name: 'Tema District',
    conference: 'Greater Accra',
    superintendent: 'Rev. Grace Asante',
    societies: 14,
    members: 1890,
    status: 'active',
    email: 'tema@amezion.gh',
    phone: '+233 30 222 2222',
    address: 'P.O. Box TM 200, Tema',
    established: '1975',
  },
  '3': {
    id: 3,
    name: 'Kumasi Metropolitan District',
    conference: 'Ashanti',
    superintendent: 'Rev. Peter Owusu',
    societies: 22,
    members: 3200,
    status: 'active',
    email: 'kumasimetro@amezion.gh',
    phone: '+233 32 222 3333',
    address: 'P.O. Box KM 300, Kumasi',
    established: '1972',
  },
  '4': {
    id: 4,
    name: 'Cape Coast District',
    conference: 'Central Region',
    superintendent: 'Rev. Mary Aidoo',
    societies: 16,
    members: 2100,
    status: 'active',
    email: 'capecoast@amezion.gh',
    phone: '+233 33 222 4444',
    address: 'P.O. Box CC 400, Cape Coast',
    established: '1974',
  },
  '5': {
    id: 5,
    name: 'Tamale District',
    conference: 'Northern',
    superintendent: 'Rev. Ibrahim Mohammed',
    societies: 12,
    members: 1560,
    status: 'active',
    email: 'tamale@amezion.gh',
    phone: '+233 37 222 5555',
    address: 'P.O. Box TL 500, Tamale',
    established: '1982',
  },
  '6': {
    id: 6,
    name: 'Takoradi District',
    conference: 'Western',
    superintendent: 'Rev. Samuel Eshun',
    societies: 15,
    members: 1980,
    status: 'active',
    email: 'takoradi@amezion.gh',
    phone: '+233 31 222 6666',
    address: 'P.O. Box TK 600, Takoradi',
    established: '1978',
  },
};

const societiesList = [
  { id: 1, name: 'Zion AME Church Osu', pastor: 'Rev. Emmanuel Darko', members: 450 },
  { id: 2, name: 'Wesley AME Church', pastor: 'Rev. Abigail Mensah', members: 320 },
  { id: 3, name: 'Trinity AME Church', pastor: 'Rev. Kwesi Appiah', members: 280 },
  { id: 4, name: 'Grace AME Church', pastor: 'Rev. Ama Osei', members: 240 },
  { id: 5, name: 'Faith AME Church', pastor: 'Rev. Yusuf Alhassan', members: 210 },
  { id: 6, name: 'Hope AME Church', pastor: 'Rev. Isaac Gyamfi', members: 195 },
];

const DistrictDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllSocieties, setShowAllSocieties] = useState(false);
  
  const district = id ? districtData[id] : null;

  if (!district) {
    return (
      <DashboardLayout title="District Not Found">
        <FloatCard className="text-center py-12">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground font-display">District not found</h2>
          <p className="text-muted-foreground mt-2">The district you're looking for doesn't exist.</p>
          <FloatButton variant="primary" className="mt-4" onClick={() => navigate('/church-structure/districts')}>
            Back to Districts
          </FloatButton>
        </FloatCard>
      </DashboardLayout>
    );
  }

  const displayedSocieties = showAllSocieties ? societiesList : societiesList.slice(0, 4);

  return (
    <DashboardLayout
      title={district.name}
      subtitle={`${district.conference} Conference • Superintendent: ${district.superintendent}`}
    >
      {/* Back button and actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <FloatButton 
          variant="ghost" 
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/church-structure/districts')}
        >
          Back to Districts
        </FloatButton>
        <FloatButton 
          variant="primary" 
          leftIcon={<Edit className="w-4 h-4" />}
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit District
        </FloatButton>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="xl:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Societies', value: district.societies, icon: <Home className="w-5 h-5" /> },
              { label: 'Members', value: district.members.toLocaleString(), icon: <Users className="w-5 h-5" /> },
              { label: 'Growth', value: '+8%', icon: <TrendingUp className="w-5 h-5" /> },
              { label: 'Clergy', value: '24', icon: <Church className="w-5 h-5" /> },
            ].map((stat) => (
              <FloatCard key={stat.label} className="text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary mx-auto mb-2">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </FloatCard>
            ))}
          </div>

          {/* Societies Table */}
          <FloatCard padding="none">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground font-display">
                Societies ({societiesList.length})
              </h2>
              <FloatButton 
                variant="outline" 
                size="sm"
                rightIcon={<ChevronRight className="w-4 h-4" />}
                onClick={() => navigate('/church-structure/societies')}
              >
                View All Societies
              </FloatButton>
            </div>
            <div className="overflow-x-auto">
              <table className="float-table">
                <thead>
                  <tr>
                    <th>Society Name</th>
                    <th>Pastor</th>
                    <th>Members</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {displayedSocieties.map((society) => (
                    <tr key={society.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-light text-secondary">
                            <Home className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-foreground">{society.name}</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground">{society.pastor}</td>
                      <td className="font-medium text-foreground">{society.members.toLocaleString()}</td>
                      <td>
                        <FloatButton variant="ghost" size="sm">View</FloatButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!showAllSocieties && societiesList.length > 4 && (
              <div className="px-6 py-4 border-t border-border">
                <FloatButton 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setShowAllSocieties(true)}
                >
                  Show {societiesList.length - 4} more societies
                </FloatButton>
              </div>
            )}
            {showAllSocieties && societiesList.length > 4 && (
              <div className="px-6 py-4 border-t border-border">
                <FloatButton 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setShowAllSocieties(false)}
                >
                  Show less
                </FloatButton>
              </div>
            )}
          </FloatCard>

          {/* Recent Activity */}
          <FloatCard padding="none">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground font-display">Recent Activity</h2>
            </div>
            <div className="divide-y divide-border">
              {[
                { message: 'New society registered: Hope AME Church', time: '3 hours ago' },
                { message: 'Monthly remittance of GH₵ 12,500 received', time: '1 day ago' },
                { message: 'Pastor transferred to Wesley AME Church', time: '3 days ago' },
                { message: 'District quarterly meeting scheduled', time: '1 week ago' },
              ].map((activity, index) => (
                <div key={index} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </FloatCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* District Info Card */}
          <FloatCard>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-light text-primary">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-display">{district.name}</h3>
                <FloatBadge variant="success" className="mt-1">Active</FloatBadge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Church className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Conference</p>
                  <p className="text-sm text-muted-foreground">{district.conference}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Superintendent</p>
                  <p className="text-sm text-muted-foreground">{district.superintendent}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">{district.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">{district.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{district.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Established</p>
                  <p className="text-sm text-muted-foreground">{district.established}</p>
                </div>
              </div>
            </div>
          </FloatCard>

          {/* Quick Actions */}
          <FloatCard>
            <h3 className="font-semibold text-foreground font-display mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <FloatButton 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/church-structure/societies')}
              >
                Add New Society
              </FloatButton>
              <FloatButton 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/finance/reports')}
              >
                View Financial Report
              </FloatButton>
              <FloatButton 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/events')}
              >
                Schedule Event
              </FloatButton>
              <FloatButton variant="outline" className="w-full justify-start">
                Send Announcement
              </FloatButton>
            </div>
          </FloatCard>
        </div>
      </div>

      {/* Edit District Modal */}
      <EditDistrictModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        district={district}
      />
    </DashboardLayout>
  );
};

export default DistrictDetails;
