import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { EditConferenceModal } from '@/components/modals/EditConferenceModal';
import { 
  Church, 
  ArrowLeft, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  Edit,
  Building2,
  TrendingUp,
  Home,
  ChevronRight
} from 'lucide-react';

const conferenceData: Record<string, {
  id: number;
  name: string;
  bishop: string;
  districts: number;
  societies: number;
  members: number;
  status: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  established: string;
}> = {
  '1': {
    id: 1,
    name: 'Greater Accra Conference',
    bishop: 'Rt. Rev. Emmanuel Asante',
    districts: 8,
    societies: 124,
    members: 15420,
    status: 'active',
    email: 'accra@amezion.gh',
    phone: '+233 30 222 3333',
    address: 'P.O. Box GP 1234, Accra',
    region: 'Greater Accra Region',
    established: '1965',
  },
  '2': {
    id: 2,
    name: 'Ashanti Conference',
    bishop: 'Rt. Rev. Kwame Mensah',
    districts: 6,
    societies: 98,
    members: 12350,
    status: 'active',
    email: 'ashanti@amezion.gh',
    phone: '+233 32 222 4444',
    address: 'P.O. Box KS 5678, Kumasi',
    region: 'Ashanti Region',
    established: '1970',
  },
  '3': {
    id: 3,
    name: 'Central Region Conference',
    bishop: 'Rt. Rev. Samuel Osei',
    districts: 5,
    societies: 76,
    members: 8920,
    status: 'active',
    email: 'central@amezion.gh',
    phone: '+233 33 222 5555',
    address: 'P.O. Box CC 9012, Cape Coast',
    region: 'Central Region',
    established: '1972',
  },
  '4': {
    id: 4,
    name: 'Northern Conference',
    bishop: 'Rt. Rev. Ibrahim Yakubu',
    districts: 4,
    societies: 52,
    members: 6240,
    status: 'active',
    email: 'northern@amezion.gh',
    phone: '+233 37 222 6666',
    address: 'P.O. Box TL 3456, Tamale',
    region: 'Northern Region',
    established: '1980',
  },
  '5': {
    id: 5,
    name: 'Western Conference',
    bishop: 'Rt. Rev. Francis Adu',
    districts: 5,
    societies: 68,
    members: 7890,
    status: 'active',
    email: 'western@amezion.gh',
    phone: '+233 31 222 7777',
    address: 'P.O. Box TK 7890, Takoradi',
    region: 'Western Region',
    established: '1975',
  },
};

const districtsList = [
  { id: 1, name: 'Accra Central District', superintendent: 'Rev. John Mensah', societies: 18, members: 2450 },
  { id: 2, name: 'Tema District', superintendent: 'Rev. Grace Asante', societies: 14, members: 1890 },
  { id: 3, name: 'East Legon District', superintendent: 'Rev. Peter Owusu', societies: 16, members: 2100 },
  { id: 4, name: 'Madina District', superintendent: 'Rev. Mary Aidoo', societies: 12, members: 1560 },
  { id: 5, name: 'Kasoa District', superintendent: 'Rev. Samuel Boateng', societies: 15, members: 1820 },
  { id: 6, name: 'Teshie-Nungua District', superintendent: 'Rev. Abigail Tetteh', societies: 13, members: 1680 },
  { id: 7, name: 'Adenta District', superintendent: 'Rev. Isaac Quansah', societies: 11, members: 1420 },
  { id: 8, name: 'Dansoman District', superintendent: 'Rev. Elizabeth Nkrumah', societies: 10, members: 1350 },
];

const ConferenceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllDistricts, setShowAllDistricts] = useState(false);
  
  const conference = id ? conferenceData[id] : null;

  if (!conference) {
    return (
      <DashboardLayout title="Conference Not Found">
        <FloatCard className="text-center py-12">
          <Church className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground font-display">Conference not found</h2>
          <p className="text-muted-foreground mt-2">The conference you're looking for doesn't exist.</p>
          <FloatButton variant="primary" className="mt-4" onClick={() => navigate('/church-structure/conferences')}>
            Back to Conferences
          </FloatButton>
        </FloatCard>
      </DashboardLayout>
    );
  }

  const displayedDistricts = showAllDistricts ? districtsList : districtsList.slice(0, 4);

  return (
    <DashboardLayout
      title={conference.name}
      subtitle={`Managed by ${conference.bishop}`}
    >
      {/* Back button and actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <FloatButton 
          variant="ghost" 
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/church-structure/conferences')}
        >
          Back to Conferences
        </FloatButton>
        <FloatButton 
          variant="primary" 
          leftIcon={<Edit className="w-4 h-4" />}
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Conference
        </FloatButton>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="xl:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Districts', value: conference.districts, icon: <Building2 className="w-5 h-5" /> },
              { label: 'Societies', value: conference.societies, icon: <Home className="w-5 h-5" /> },
              { label: 'Members', value: conference.members.toLocaleString(), icon: <Users className="w-5 h-5" /> },
              { label: 'Growth', value: '+12%', icon: <TrendingUp className="w-5 h-5" /> },
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

          {/* Districts Table */}
          <FloatCard padding="none">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground font-display">
                Districts ({districtsList.length})
              </h2>
              <FloatButton 
                variant="outline" 
                size="sm"
                rightIcon={<ChevronRight className="w-4 h-4" />}
                onClick={() => navigate('/church-structure/districts')}
              >
                View All Districts
              </FloatButton>
            </div>
            <div className="overflow-x-auto">
              <table className="float-table">
                <thead>
                  <tr>
                    <th>District Name</th>
                    <th>Superintendent</th>
                    <th>Societies</th>
                    <th>Members</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {displayedDistricts.map((district) => (
                    <tr key={district.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-foreground">{district.name}</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground">{district.superintendent}</td>
                      <td className="font-medium text-foreground">{district.societies}</td>
                      <td className="font-medium text-foreground">{district.members.toLocaleString()}</td>
                      <td>
                        <FloatButton variant="ghost" size="sm">View</FloatButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!showAllDistricts && districtsList.length > 4 && (
              <div className="px-6 py-4 border-t border-border">
                <FloatButton 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setShowAllDistricts(true)}
                >
                  Show {districtsList.length - 4} more districts
                </FloatButton>
              </div>
            )}
            {showAllDistricts && districtsList.length > 4 && (
              <div className="px-6 py-4 border-t border-border">
                <FloatButton 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setShowAllDistricts(false)}
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
                { message: 'New society registered in Tema District', time: '2 hours ago' },
                { message: 'Quarterly remittance of GH₵ 45,000 received', time: '1 day ago' },
                { message: 'District superintendent appointed for East Legon', time: '3 days ago' },
                { message: 'Annual conference report submitted', time: '1 week ago' },
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
          {/* Conference Info Card */}
          <FloatCard>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Church className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-display">{conference.name}</h3>
                <FloatBadge variant="success" className="mt-1">Active</FloatBadge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Bishop</p>
                  <p className="text-sm text-muted-foreground">{conference.bishop}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">{conference.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">{conference.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{conference.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Established</p>
                  <p className="text-sm text-muted-foreground">{conference.established}</p>
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
                onClick={() => navigate('/church-structure/districts')}
              >
                Add New District
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

      {/* Edit Conference Modal */}
      <EditConferenceModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        conference={conference}
      />
    </DashboardLayout>
  );
};

export default ConferenceDetails;
