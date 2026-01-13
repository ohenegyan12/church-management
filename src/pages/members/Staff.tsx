import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { AddStaffModal } from '@/components/modals/AddStaffModal';
import { Plus, Search, Filter, Briefcase, Mail, Phone } from 'lucide-react';

const initialStaff = [
  { id: 1, name: 'Mr. Daniel Appiah', department: 'Finance', position: 'Chief Accountant', email: 'd.appiah@amezion.gh', phone: '+233 24 111 0001', status: 'active' },
  { id: 2, name: 'Mrs. Elizabeth Mensah', department: 'Administration', position: 'Office Manager', email: 'e.mensah@amezion.gh', phone: '+233 24 111 0002', status: 'active' },
  { id: 3, name: 'Mr. Samuel Osei', department: 'IT', position: 'Systems Administrator', email: 's.osei@amezion.gh', phone: '+233 24 111 0003', status: 'active' },
  { id: 4, name: 'Ms. Grace Adomako', department: 'HR', position: 'HR Manager', email: 'g.adomako@amezion.gh', phone: '+233 24 111 0004', status: 'active' },
  { id: 5, name: 'Mr. Isaac Boateng', department: 'Communications', position: 'Media Officer', email: 'i.boateng@amezion.gh', phone: '+233 24 111 0005', status: 'active' },
];

const Staff: React.FC = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(initialStaff);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddStaff = (newStaff: any) => {
    setStaff([...staff, newStaff]);
  };

  return (
    <DashboardLayout
      title="Staff Management"
      subtitle="Manage head office and administrative staff"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Staff', value: '45', color: 'bg-primary-light text-primary' },
          { label: 'Head Office', value: '32', color: 'bg-secondary-light text-secondary' },
          { label: 'Regional', value: '13', color: 'bg-accent-light text-accent' },
          { label: 'Departments', value: '8', color: 'bg-success-light text-success' },
        ].map((stat) => (
          <FloatCard key={stat.label} className="text-center">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} mb-2`}>
              <Briefcase className="w-5 h-5" />
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
            placeholder="Search staff..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <FloatButton variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
          Add Staff
        </FloatButton>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {staff.map((member, index) => (
          <FloatCard key={member.id} hover className="animate-slide-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg font-semibold">
                {member.name.split(' ')[1][0]}
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-display">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.position}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{member.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{member.phone}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <FloatBadge variant={member.status === 'active' ? 'success' : 'default'}>
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </FloatBadge>
              <FloatButton 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(`/members/staff/${member.id}`)}
              >
                View Profile
              </FloatButton>
            </div>
          </FloatCard>
        ))}
      </div>

      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStaff}
      />
    </DashboardLayout>
  );
};

export default Staff;
