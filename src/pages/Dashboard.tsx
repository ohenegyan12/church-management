import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatButton } from '@/components/ui/FloatButton';
import { AddMemberModal } from '@/components/modals/AddMemberModal';
import { RecordPaymentModal } from '@/components/modals/RecordPaymentModal';
import { CreateEventModal } from '@/components/modals/CreateEventModal';
import { GenerateReportModal } from '@/components/modals/GenerateReportModal';
import { Users, Wallet, Calendar, ArrowRight, MapPin, Clock, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);

  const stats = [
    {
      title: 'Total Congregations',
      value: '524',
      change: '+12 this month',
      changeType: 'positive' as const,
      textOnDark: true,
      className: 'text-white border-transparent',
      style: { backgroundColor: '#3398CC', borderColor: 'transparent' },
    },
    {
      title: 'Active Clergy',
      value: '1,247',
      change: '+5.2% from last year',
      changeType: 'positive' as const,
      textOnDark: true,
      className: 'text-white border-transparent',
      style: { backgroundColor: '#663398', borderColor: 'transparent' },
    },
    {
      title: 'Total Members',
      value: '52,840',
      change: '+2,340 new members',
      changeType: 'positive' as const,
      textOnDark: true,
      className: 'text-white border-transparent',
      style: { backgroundColor: '#049B50', borderColor: 'transparent' },
    },
    {
      title: 'Collections (This Month)',
      value: 'GH₵ 245,680',
      change: '+18% vs last month',
      changeType: 'positive' as const,
      textOnDark: true,
      className: 'text-white border-transparent',
      style: { backgroundColor: '#FC3434', borderColor: 'transparent' },
    },
  ];

  const recentActivity = [
    {
      id: 1,
      message: 'New clergy ordained at Accra Central District',
      time: '2 hours ago',
      badge: 'Clergy',
    },
    {
      id: 2,
      message: 'Quarterly remittance received from Greater Accra Conference',
      time: '4 hours ago',
      badge: 'Finance',
    },
    {
      id: 3,
      message: 'Annual Conference scheduled for March 15-18, 2024',
      time: '1 day ago',
      badge: 'Event',
    },
    {
      id: 4,
      message: "New policy document uploaded: Minister's Handbook 2024",
      time: '2 days ago',
      badge: 'Document',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Conference',
      date: 'Mar 15-18, 2024',
      location: 'Cape Coast',
    },
    {
      id: 2,
      title: 'Youth Convention',
      date: 'Apr 5-7, 2024',
      location: 'Kumasi',
    },
    {
      id: 3,
      title: "Founder's Day Celebration",
      date: 'May 12, 2024',
      location: 'All Districts',
    },
  ];

  const quickActions = [
    { icon: <Users className="w-5 h-5" />, label: 'Add New Member', onClick: () => setIsAddMemberOpen(true) },
    { icon: <Wallet className="w-5 h-5" />, label: 'Record Payment', onClick: () => setIsRecordPaymentOpen(true) },
    { icon: <Calendar className="w-5 h-5" />, label: 'Create Event', onClick: () => setIsCreateEventOpen(true) },
    { icon: <FileText className="w-5 h-5" />, label: 'Generate Report', onClick: () => setIsGenerateReportOpen(true) },
  ];

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back! Here's what's happening in your church.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            className={`animation-delay-${index * 100}`}
          />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2">
          <FloatCard padding="none" className="h-full flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground font-display">Recent Activity</h2>
              <FloatButton variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View all
              </FloatButton>
            </div>
            <div className="divide-y divide-border flex-1">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <FloatBadge variant="primary">{activity.badge}</FloatBadge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FloatCard>
        </div>

        {/* Upcoming Events */}
        <div>
          <FloatCard padding="none" className="h-full flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground font-display">Upcoming Events</h2>
              <FloatButton variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View all
              </FloatButton>
            </div>
            <div className="divide-y divide-border flex-1">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-light text-secondary shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FloatCard>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground font-display mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <FloatCard
              key={action.label}
              hover
              className="flex flex-col items-center justify-center py-6 text-center cursor-pointer"
              onClick={action.onClick}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary mb-3">
                {action.icon}
              </div>
              <p className="text-sm font-medium text-foreground">{action.label}</p>
            </FloatCard>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddMemberModal isOpen={isAddMemberOpen} onClose={() => setIsAddMemberOpen(false)} />
      <RecordPaymentModal isOpen={isRecordPaymentOpen} onClose={() => setIsRecordPaymentOpen(false)} />
      <CreateEventModal isOpen={isCreateEventOpen} onClose={() => setIsCreateEventOpen(false)} />
      <GenerateReportModal isOpen={isGenerateReportOpen} onClose={() => setIsGenerateReportOpen(false)} />
    </DashboardLayout>
  );
};

export default Dashboard;
