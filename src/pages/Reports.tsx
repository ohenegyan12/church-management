import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { GenerateReportModal } from '@/components/modals/GenerateReportModal';
import { ViewReportModal } from '@/components/modals/ViewReportModal';
import { DeleteReportModal } from '@/components/modals/DeleteReportModal';
import { toast } from '@/hooks/use-toast';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  Calendar, 
  Download, 
  FileText, 
  Activity,
  MapPin,
  Eye,
  Trash2,
  Plus
} from 'lucide-react';

const reportCategories = [
  { 
    icon: <Wallet className="w-6 h-6" />, 
    title: 'Financial Reports', 
    desc: 'Collections, remittances, and expenditure',
    reports: ['Monthly Collections', 'Quarterly Remittances', 'Annual Financial Statement'],
    color: 'bg-success-light text-success'
  },
  { 
    icon: <Users className="w-6 h-6" />, 
    title: 'Membership Reports', 
    desc: 'Growth, demographics, and attendance',
    reports: ['Membership Growth', 'Clergy Statistics', 'Attendance Trends'],
    color: 'bg-primary-light text-primary'
  },
  { 
    icon: <MapPin className="w-6 h-6" />, 
    title: 'Branch Performance', 
    desc: 'Conference, district, and society metrics',
    reports: ['Conference Performance', 'District Comparison', 'Society Rankings'],
    color: 'bg-secondary-light text-secondary'
  },
  { 
    icon: <Calendar className="w-6 h-6" />, 
    title: 'Event Reports', 
    desc: 'Event attendance and participation',
    reports: ['Event Attendance', 'Registration Stats', 'Annual Events Summary'],
    color: 'bg-accent-light text-accent'
  },
];

const initialReports = [
  { id: 1, name: 'January 2024 Collections Summary', type: 'Financial', generated: 'Jan 31, 2024', size: '245 KB', period: 'January 2024' },
  { id: 2, name: 'Q4 2023 Membership Growth Report', type: 'Membership', generated: 'Jan 15, 2024', size: '1.2 MB', period: 'Q4 2023' },
  { id: 3, name: 'Annual Conference 2023 Attendance', type: 'Events', generated: 'Jan 10, 2024', size: '890 KB', period: '2023' },
  { id: 4, name: 'District Performance Q4 2023', type: 'Performance', generated: 'Jan 5, 2024', size: '2.1 MB', period: 'Q4 2023' },
  { id: 5, name: '2023 Annual Financial Statement', type: 'Financial', generated: 'Jan 2, 2024', size: '3.5 MB', period: '2023' },
];

const collectionsDataByYear: Record<string, { month: string; amount: number }[]> = {
  '2024': [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 67000 },
    { month: 'Jul', amount: 72000 },
    { month: 'Aug', amount: 69000 },
    { month: 'Sep', amount: 78000 },
    { month: 'Oct', amount: 82000 },
    { month: 'Nov', amount: 75000 },
    { month: 'Dec', amount: 91000 },
  ],
  '2023': [
    { month: 'Jan', amount: 38000 },
    { month: 'Feb', amount: 42000 },
    { month: 'Mar', amount: 45000 },
    { month: 'Apr', amount: 51000 },
    { month: 'May', amount: 49000 },
    { month: 'Jun', amount: 58000 },
    { month: 'Jul', amount: 62000 },
    { month: 'Aug', amount: 59000 },
    { month: 'Sep', amount: 65000 },
    { month: 'Oct', amount: 71000 },
    { month: 'Nov', amount: 68000 },
    { month: 'Dec', amount: 79000 },
  ],
  '2022': [
    { month: 'Jan', amount: 32000 },
    { month: 'Feb', amount: 35000 },
    { month: 'Mar', amount: 38000 },
    { month: 'Apr', amount: 42000 },
    { month: 'May', amount: 40000 },
    { month: 'Jun', amount: 48000 },
    { month: 'Jul', amount: 52000 },
    { month: 'Aug', amount: 49000 },
    { month: 'Sep', amount: 55000 },
    { month: 'Oct', amount: 58000 },
    { month: 'Nov', amount: 54000 },
    { month: 'Dec', amount: 65000 },
  ],
};

const membershipData = [
  { name: 'Greater Accra', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Ashanti', value: 28, color: 'hsl(var(--secondary))' },
  { name: 'Central', value: 18, color: 'hsl(var(--success))' },
  { name: 'Western', value: 12, color: 'hsl(var(--accent))' },
  { name: 'Northern', value: 7, color: 'hsl(var(--muted-foreground))' },
];

const Reports: React.FC = () => {
  const [reports, setReports] = useState(initialReports);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState('2024');

  const collectionsData = collectionsDataByYear[selectedYear];

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const handleDeleteReport = (report: any) => {
    setSelectedReport(report);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (reportId: number) => {
    const reportToDelete = reports.find(r => r.id === reportId);
    setReports(reports.filter(r => r.id !== reportId));
    toast({
      title: "Report Deleted",
      description: `"${reportToDelete?.name}" has been deleted.`,
      variant: "destructive",
    });
  };

  const handleDownload = (report: any) => {
    toast({
      title: "Download Started",
      description: `Downloading "${report.name}"...`,
    });
  };

  return (
    <DashboardLayout
      title="Reports & Analytics"
      subtitle="Generate insights and download reports across all modules"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Reports Generated', value: '1,247', icon: <FileText className="w-5 h-5" />, change: '+24 this month' },
          { label: 'Downloads', value: '3,892', icon: <Download className="w-5 h-5" />, change: '+156 this week' },
          { label: 'Scheduled Reports', value: '12', icon: <Calendar className="w-5 h-5" />, change: 'Active' },
          { label: 'Data Sources', value: '8', icon: <Activity className="w-5 h-5" />, change: 'Connected' },
        ].map((stat) => (
          <FloatCard key={stat.label} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </FloatCard>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <FloatCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground font-display">Collections Trend ({selectedYear})</h3>
            <div className="flex items-center gap-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <FloatBadge variant="success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18%
              </FloatBadge>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`GH₵ ${value.toLocaleString()}`, 'Collections']}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FloatCard>

        <FloatCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground font-display">Membership Distribution</h3>
            <FloatBadge variant="primary">By Conference</FloatBadge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {membershipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Members']}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </FloatCard>
      </div>

      {/* Report Categories */}
      <h2 className="text-lg font-semibold text-foreground font-display mb-4">Report Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {reportCategories.map((category) => (
          <FloatCard key={category.title} hover className="cursor-pointer">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.color} mb-4`}>
              {category.icon}
            </div>
            <h3 className="font-semibold text-foreground font-display">{category.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">{category.desc}</p>
            <div className="space-y-2">
              {category.reports.map((report) => (
                <div key={report} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <FileText className="w-3 h-3" />
                  {report}
                </div>
              ))}
            </div>
          </FloatCard>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground font-display">Recent Reports</h2>
        <FloatButton 
          variant="primary" 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsGenerateModalOpen(true)}
        >
          Generate New Report
        </FloatButton>
      </div>
      
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Generated</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{report.name}</span>
                    </div>
                  </td>
                  <td>
                    <FloatBadge variant="outline">{report.type}</FloatBadge>
                  </td>
                  <td className="text-muted-foreground">{report.generated}</td>
                  <td className="text-muted-foreground">{report.size}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FloatButton 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="w-4 h-4" />
                      </FloatButton>
                      <FloatButton 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Download className="w-4 h-4" />}
                        onClick={() => handleDownload(report)}
                      >
                        Download
                      </FloatButton>
                      <FloatButton 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteReport(report)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </FloatButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatCard>

      {/* Modals */}
      <GenerateReportModal 
        isOpen={isGenerateModalOpen} 
        onClose={() => setIsGenerateModalOpen(false)} 
      />
      <ViewReportModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        report={selectedReport}
      />
      <DeleteReportModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        report={selectedReport}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  );
};

export default Reports;
