import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { EditLayOfficerModal } from '@/components/modals/EditLayOfficerModal';
import { ArrowLeft, Mail, Phone, Calendar, Building2, Edit, UserCheck } from 'lucide-react';

const initialOfficersData = [
  { id: 1, name: 'Bro. Kofi Asante', position: 'Steward', society: 'Zion AME Osu', since: '2018', status: 'active', email: 'k.asante@email.com', phone: '+233 24 111 2222', bio: 'Bro. Kofi Asante has been a faithful steward at Zion AME Osu for over 6 years. He oversees the financial operations and property maintenance of the church.' },
  { id: 2, name: 'Sis. Ama Darko', position: 'Class Leader', society: 'Wesley AME Tema', since: '2020', status: 'active', email: 'a.darko@email.com', phone: '+233 24 222 3333', bio: 'Sis. Ama Darko leads a vibrant class of 25 members, focusing on spiritual growth and community support.' },
  { id: 3, name: 'Bro. Yaw Mensah', position: 'Trustee', society: 'Trinity AME Kumasi', since: '2015', status: 'active', email: 'y.mensah@email.com', phone: '+233 24 333 4444', bio: 'Bro. Yaw Mensah serves as a trustee, managing church assets and investments with diligence and integrity.' },
  { id: 4, name: 'Sis. Akua Owusu', position: 'Stewardess', society: 'Grace AME Cape Coast', since: '2019', status: 'active', email: 'a.owusu@email.com', phone: '+233 24 444 5555', bio: 'Sis. Akua Owusu coordinates hospitality and welfare activities, ensuring members feel welcomed and cared for.' },
  { id: 5, name: 'Bro. Kwame Boateng', position: 'Lay Delegate', society: 'Faith AME Tamale', since: '2021', status: 'active', email: 'k.boateng@email.com', phone: '+233 24 555 6666', bio: 'Bro. Kwame Boateng represents Faith AME Tamale at district and conference meetings.' },
];

const LayOfficerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [officersData, setOfficersData] = useState(initialOfficersData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const officer = officersData.find(o => o.id === Number(id));
  
  if (!officer) {
    return (
      <DashboardLayout title="Officer Not Found" subtitle="">
        <FloatCard>
          <p className="text-muted-foreground">The lay officer you're looking for doesn't exist.</p>
          <FloatButton variant="primary" onClick={() => navigate('/members/lay-officers')} className="mt-4">
            Back to Lay Officers
          </FloatButton>
        </FloatCard>
      </DashboardLayout>
    );
  }

  const handleSaveOfficer = (updatedOfficer: any) => {
    setOfficersData(officersData.map(o => o.id === updatedOfficer.id ? updatedOfficer : o));
  };

  return (
    <DashboardLayout
      title={officer.name}
      subtitle={officer.position}
    >
      {/* Back Button */}
      <FloatButton
        variant="ghost"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/members/lay-officers')}
        className="mb-6"
      >
        Back to Lay Officers
      </FloatButton>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <FloatCard className="lg:col-span-1">
          <div className="text-center">
            <div className="h-24 w-24 rounded-full bg-accent-light flex items-center justify-center text-accent text-3xl font-bold mx-auto mb-4">
              <UserCheck className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold text-foreground font-display">{officer.name}</h2>
            <p className="text-muted-foreground">{officer.position}</p>
            <div className="mt-3">
              <FloatBadge variant={officer.status === 'active' ? 'success' : 'default'}>
                {officer.status.charAt(0).toUpperCase() + officer.status.slice(1)}
              </FloatBadge>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{officer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground">{officer.phone}</p>
              </div>
            </div>
          </div>

          <FloatButton 
            variant="outline" 
            leftIcon={<Edit className="w-4 h-4" />} 
            className="w-full mt-6"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </FloatButton>
        </FloatCard>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Information */}
          <FloatCard>
            <h3 className="text-lg font-semibold text-foreground font-display mb-4">Assignment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Society</p>
                  <p className="font-medium text-foreground">{officer.society}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Serving Since</p>
                  <p className="font-medium text-foreground">{officer.since}</p>
                </div>
              </div>
            </div>
          </FloatCard>

          {/* Biography */}
          <FloatCard>
            <h3 className="text-lg font-semibold text-foreground font-display mb-4">About</h3>
            <p className="text-muted-foreground leading-relaxed">{officer.bio}</p>
          </FloatCard>

          {/* Service Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">{2024 - parseInt(officer.since)}</p>
              <p className="text-sm text-muted-foreground">Years Serving</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">52</p>
              <p className="text-sm text-muted-foreground">Meetings Attended</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">24</p>
              <p className="text-sm text-muted-foreground">Events Organized</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">98%</p>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </FloatCard>
          </div>
        </div>
      </div>

      <EditLayOfficerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveOfficer}
        officer={officer}
      />
    </DashboardLayout>
  );
};

export default LayOfficerDetails;
