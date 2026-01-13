import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { Plus, Search, Filter, Users, UserPlus, Calendar, Clock, FileText, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const employees = [
  { id: 1, name: 'Mr. Daniel Appiah', department: 'Finance', position: 'Chief Accountant', joinDate: '2015-01-15', status: 'active', leaveBalance: 18 },
  { id: 2, name: 'Mrs. Elizabeth Mensah', department: 'Administration', position: 'Office Manager', joinDate: '2018-03-20', status: 'active', leaveBalance: 15 },
  { id: 3, name: 'Mr. Samuel Osei', department: 'IT', position: 'Systems Administrator', joinDate: '2020-06-10', status: 'active', leaveBalance: 21 },
  { id: 4, name: 'Ms. Grace Adomako', department: 'HR', position: 'HR Manager', joinDate: '2019-09-05', status: 'on-leave', leaveBalance: 5 },
  { id: 5, name: 'Mr. Isaac Boateng', department: 'Communications', position: 'Media Officer', joinDate: '2021-02-14', status: 'active', leaveBalance: 20 },
];

const leaveRequests = [
  { id: 1, employee: 'Ms. Grace Adomako', type: 'Annual Leave', from: '2024-01-15', to: '2024-01-22', status: 'approved' },
  { id: 2, employee: 'Mr. Daniel Appiah', type: 'Sick Leave', from: '2024-01-18', to: '2024-01-19', status: 'pending' },
  { id: 3, employee: 'Mrs. Elizabeth Mensah', type: 'Personal Leave', from: '2024-01-25', to: '2024-01-25', status: 'pending' },
];

const HR: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'employees' | 'leave'>('employees');

  const handleAddEmployee = () => {
    toast.info('Add Employee modal coming soon');
  };

  const handleApprove = (id: number) => {
    toast.success('Leave request approved');
  };

  const handleReject = (id: number) => {
    toast.error('Leave request rejected');
  };

  return (
    <DashboardLayout
      title="Human Resources"
      subtitle="Manage employees, leave requests, and HR operations"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <FloatCard className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary mb-2">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground font-display">45</p>
          <p className="text-sm text-muted-foreground">Total Employees</p>
        </FloatCard>
        <FloatCard className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-success-light text-success mb-2">
            <Briefcase className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground font-display">8</p>
          <p className="text-sm text-muted-foreground">Departments</p>
        </FloatCard>
        <FloatCard className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-warning-light text-warning mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground font-display">3</p>
          <p className="text-sm text-muted-foreground">Pending Requests</p>
        </FloatCard>
        <FloatCard className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground font-display">2</p>
          <p className="text-sm text-muted-foreground">On Leave Today</p>
        </FloatCard>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <FloatButton
          variant={activeTab === 'employees' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('employees')}
        >
          Employees
        </FloatButton>
        <FloatButton
          variant={activeTab === 'leave' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('leave')}
        >
          Leave Requests
        </FloatButton>
      </div>

      {activeTab === 'employees' ? (
        <>
          {/* Header actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
            <div className="flex gap-3 flex-1 max-w-lg">
              <FloatInput
                placeholder="Search employees..."
                leftIcon={<Search className="w-4 h-4" />}
                className="flex-1"
              />
              <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
                Filter
              </FloatButton>
            </div>
            <FloatButton variant="primary" leftIcon={<UserPlus className="w-4 h-4" />} onClick={handleAddEmployee}>
              Add Employee
            </FloatButton>
          </div>

          {/* Employees Table */}
          <FloatCard padding="none">
            <div className="overflow-x-auto">
              <table className="float-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Join Date</th>
                    <th>Leave Balance</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                            {emp.name.split(' ')[1][0]}
                          </div>
                          <span className="font-medium text-foreground">{emp.name}</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground">{emp.department}</td>
                      <td className="text-muted-foreground">{emp.position}</td>
                      <td className="text-muted-foreground">{emp.joinDate}</td>
                      <td className="text-foreground font-medium">{emp.leaveBalance} days</td>
                      <td>
                        <FloatBadge variant={emp.status === 'active' ? 'success' : 'warning'}>
                          {emp.status === 'active' ? 'Active' : 'On Leave'}
                        </FloatBadge>
                      </td>
                      <td>
                        <FloatButton variant="ghost" size="sm">View</FloatButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FloatCard>
        </>
      ) : (
        <>
          {/* Leave Requests */}
          <FloatCard padding="none">
            <div className="overflow-x-auto">
              <table className="float-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="font-medium text-foreground">{request.employee}</td>
                      <td>
                        <FloatBadge variant="outline">{request.type}</FloatBadge>
                      </td>
                      <td className="text-muted-foreground">{request.from}</td>
                      <td className="text-muted-foreground">{request.to}</td>
                      <td>
                        <FloatBadge 
                          variant={request.status === 'approved' ? 'success' : request.status === 'pending' ? 'warning' : 'destructive'}
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </FloatBadge>
                      </td>
                      <td>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <FloatButton variant="ghost" size="sm" onClick={() => handleApprove(request.id)}>
                              Approve
                            </FloatButton>
                            <FloatButton variant="ghost" size="sm" onClick={() => handleReject(request.id)}>
                              Reject
                            </FloatButton>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FloatCard>
        </>
      )}
    </DashboardLayout>
  );
};

export default HR;
