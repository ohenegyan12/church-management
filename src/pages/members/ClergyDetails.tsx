import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { EditClergyModal } from '@/components/modals/EditClergyModal';
import { ArrowLeft, Mail, Phone, Calendar, Building2, Edit, User } from 'lucide-react';

const initialClergyData = [
  { id: 1, name: 'Rt. Rev. Emmanuel Asante', title: 'Bishop', conference: 'Greater Accra', ordained: '1995', status: 'active', email: 'e.asante@amezion.gh', phone: '+233 24 111 2222', bio: 'Rt. Rev. Emmanuel Asante has served the AME Zion Church for over 29 years. He was ordained as Bishop in 2010 and has led the Greater Accra Conference with dedication and vision.', education: 'Doctor of Divinity - Trinity Theological Seminary', birthDate: 'March 15, 1960' },
  { id: 2, name: 'Rev. Dr. John Mensah', title: 'Presiding Elder', district: 'Accra Central', ordained: '2002', status: 'active', email: 'j.mensah@amezion.gh', phone: '+233 24 222 3333', bio: 'Rev. Dr. John Mensah oversees the Accra Central District with 15 local societies under his care.', education: 'PhD Theology - University of Ghana', birthDate: 'July 22, 1970' },
  { id: 3, name: 'Rev. Grace Asante', title: 'Pastor', society: 'Wesley AME Church', ordained: '2010', status: 'active', email: 'g.asante@amezion.gh', phone: '+233 24 333 4444', bio: 'Rev. Grace Asante leads Wesley AME Church with a focus on youth ministry and community outreach.', education: 'Master of Divinity - Trinity Theological Seminary', birthDate: 'December 5, 1980' },
  { id: 4, name: 'Rev. Peter Owusu', title: 'Presiding Elder', district: 'Kumasi Metro', ordained: '2000', status: 'active', email: 'p.owusu@amezion.gh', phone: '+233 24 444 5555', bio: 'Rev. Peter Owusu has been serving as Presiding Elder for Kumasi Metro District since 2015.', education: 'Master of Theology - Methodist University', birthDate: 'April 10, 1968' },
  { id: 5, name: 'Rev. Mary Aidoo', title: 'Pastor', society: 'Trinity AME Church', ordained: '2012', status: 'active', email: 'm.aidoo@amezion.gh', phone: '+233 24 555 6666', bio: 'Rev. Mary Aidoo is passionate about women\'s ministry and has grown Trinity AME Church significantly.', education: 'Bachelor of Theology - Valley View University', birthDate: 'September 18, 1982' },
  { id: 6, name: 'Rev. Samuel Osei', title: 'Retired Bishop', conference: 'Central Region', ordained: '1985', status: 'retired', email: 's.osei@amezion.gh', phone: '+233 24 666 7777', bio: 'Rev. Samuel Osei served as Bishop for 20 years before his retirement in 2020. He continues to mentor young ministers.', education: 'Doctor of Ministry - Asbury Theological Seminary', birthDate: 'January 30, 1955' },
];

const ClergyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [clergyData, setClergyData] = useState(initialClergyData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const clergy = clergyData.find(c => c.id === Number(id));
  
  if (!clergy) {
    return (
      <DashboardLayout title="Clergy Not Found" subtitle="">
        <FloatCard>
          <p className="text-muted-foreground">The clergy member you're looking for doesn't exist.</p>
          <FloatButton variant="primary" onClick={() => navigate('/members/clergy')} className="mt-4">
            Back to Clergy
          </FloatButton>
        </FloatCard>
      </DashboardLayout>
    );
  }

  const handleSaveClergy = (updatedClergy: any) => {
    setClergyData(clergyData.map(c => c.id === updatedClergy.id ? updatedClergy : c));
  };

  const assignment = clergy.conference || clergy.district || clergy.society;
  const assignmentType = clergy.conference ? 'Conference' : clergy.district ? 'District' : 'Society';

  return (
    <DashboardLayout
      title={clergy.name}
      subtitle={clergy.title}
    >
      {/* Back Button */}
      <FloatButton
        variant="ghost"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/members/clergy')}
        className="mb-6"
      >
        Back to Clergy
      </FloatButton>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <FloatCard className="lg:col-span-1">
          <div className="text-center">
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold mx-auto mb-4">
              {clergy.name.split(' ').slice(-1)[0][0]}
            </div>
            <h2 className="text-xl font-bold text-foreground font-display">{clergy.name}</h2>
            <p className="text-muted-foreground">{clergy.title}</p>
            <div className="mt-3">
              <FloatBadge variant={clergy.status === 'active' ? 'success' : 'default'}>
                {clergy.status.charAt(0).toUpperCase() + clergy.status.slice(1)}
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
                <p className="text-foreground">{clergy.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground">{clergy.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Birth Date</p>
                <p className="text-foreground">{clergy.birthDate}</p>
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
          {/* Ministry Information */}
          <FloatCard>
            <h3 className="text-lg font-semibold text-foreground font-display mb-4">Ministry Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{assignmentType}</p>
                  <p className="font-medium text-foreground">{assignment}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Year Ordained</p>
                  <p className="font-medium text-foreground">{clergy.ordained}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 md:col-span-2">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p className="font-medium text-foreground">{clergy.education}</p>
                </div>
              </div>
            </div>
          </FloatCard>

          {/* Biography */}
          <FloatCard>
            <h3 className="text-lg font-semibold text-foreground font-display mb-4">Biography</h3>
            <p className="text-muted-foreground leading-relaxed">{clergy.bio}</p>
          </FloatCard>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">{2024 - parseInt(clergy.ordained)}</p>
              <p className="text-sm text-muted-foreground">Years in Ministry</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">156</p>
              <p className="text-sm text-muted-foreground">Sermons Preached</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">45</p>
              <p className="text-sm text-muted-foreground">Baptisms</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">28</p>
              <p className="text-sm text-muted-foreground">Weddings</p>
            </FloatCard>
          </div>
        </div>
      </div>

      <EditClergyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveClergy}
        clergy={clergy}
      />
    </DashboardLayout>
  );
};

export default ClergyDetails;
