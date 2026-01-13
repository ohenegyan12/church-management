import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { EditStaffModal } from '@/components/modals/EditStaffModal';
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, Edit } from 'lucide-react';

const initialStaffData = [
  { id: 1, name: 'Mr. Daniel Appiah', department: 'Finance', position: 'Chief Accountant', email: 'd.appiah@amezion.gh', phone: '+233 24 111 0001', status: 'active', hireDate: 'January 2015', bio: 'Mr. Daniel Appiah oversees all financial operations of the AME Zion Church Ghana. He has over 15 years of experience in church finance management.' },
  { id: 2, name: 'Mrs. Elizabeth Mensah', department: 'Administration', position: 'Office Manager', email: 'e.mensah@amezion.gh', phone: '+233 24 111 0002', status: 'active', hireDate: 'March 2018', bio: 'Mrs. Elizabeth Mensah manages daily administrative operations and ensures smooth office functioning across all departments.' },
  { id: 3, name: 'Mr. Samuel Osei', department: 'IT', position: 'Systems Administrator', email: 's.osei@amezion.gh', phone: '+233 24 111 0003', status: 'active', hireDate: 'June 2020', bio: 'Mr. Samuel Osei maintains all IT infrastructure and has implemented the church management system.' },
  { id: 4, name: 'Ms. Grace Adomako', department: 'HR', position: 'HR Manager', email: 'g.adomako@amezion.gh', phone: '+233 24 111 0004', status: 'active', hireDate: 'September 2019', bio: 'Ms. Grace Adomako handles all human resource matters including recruitment, training, and staff welfare.' },
  { id: 5, name: 'Mr. Isaac Boateng', department: 'Communications', position: 'Media Officer', email: 'i.boateng@amezion.gh', phone: '+233 24 111 0005', status: 'active', hireDate: 'February 2021', bio: 'Mr. Isaac Boateng manages church communications, social media presence, and media productions.' },
];

const StaffDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState(initialStaffData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const staff = staffData.find(s => s.id === Number(id));
  
  if (!staff) {
    return (
      <DashboardLayout title="Staff Not Found" subtitle="">
        <FloatCard>
          <p className="text-muted-foreground">The staff member you're looking for doesn't exist.</p>
          <FloatButton variant="primary" onClick={() => navigate('/members/staff')} className="mt-4">
            Back to Staff
          </FloatButton>
        </FloatCard>
      </DashboardLayout>
    );
  }

  const handleSaveStaff = (updatedStaff: any) => {
    setStaffData(staffData.map(s => s.id === updatedStaff.id ? updatedStaff : s));
  };

  return (
    <DashboardLayout
      title={staff.name}
      subtitle={staff.position}
    >
      {/* Back Button */}
      <FloatButton
        variant="ghost"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/members/staff')}
        className="mb-6"
      >
        Back to Staff
      </FloatButton>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <FloatCard className="lg:col-span-1">
          <div className="text-center">
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold mx-auto mb-4">
              {staff.name.split(' ')[1][0]}
            </div>
            <h2 className="text-xl font-bold text-foreground font-display">{staff.name}</h2>
            <p className="text-muted-foreground">{staff.position}</p>
            <div className="mt-3">
              <FloatBadge variant={staff.status === 'active' ? 'success' : 'default'}>
                {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
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
                <p className="text-foreground">{staff.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground">{staff.phone}</p>
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
          {/* Employment Information */}
          <FloatCard>
            <h3 className="text-lg font-semibold text-foreground font-display mb-4">Employment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Briefcase className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium text-foreground">{staff.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Hire Date</p>
                  <p className="font-medium text-foreground">{staff.hireDate}</p>
                </div>
              </div>
            </div>
          </FloatCard>

          {/* Biography */}
          <FloatCard>
            <h3 className="text-lg font-semibold text-foreground font-display mb-4">About</h3>
            <p className="text-muted-foreground leading-relaxed">{staff.bio}</p>
          </FloatCard>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">
                {staff.hireDate ? 2024 - parseInt(staff.hireDate.split(' ')[1]) : 0}
              </p>
              <p className="text-sm text-muted-foreground">Years of Service</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">98%</p>
              <p className="text-sm text-muted-foreground">Attendance</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">45</p>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </FloatCard>
            <FloatCard className="text-center">
              <p className="text-2xl font-bold text-foreground font-display">4.8</p>
              <p className="text-sm text-muted-foreground">Performance Rating</p>
            </FloatCard>
          </div>
        </div>
      </div>

      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveStaff}
        staff={staff}
      />
    </DashboardLayout>
  );
};

export default StaffDetails;
