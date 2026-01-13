import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { ViewReportModal } from '@/components/modals/ViewReportModal';
import { Download, FileText, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

const reports = [
  { id: 1, name: 'Monthly Collections Summary', type: 'Collections', period: 'January 2024', generated: '2024-01-31' },
  { id: 2, name: 'Conference Remittance Report', type: 'Remittance', period: 'Q4 2023', generated: '2024-01-05' },
  { id: 3, name: 'Annual Financial Statement', type: 'Financial', period: '2023', generated: '2024-01-15' },
  { id: 4, name: 'District Performance Report', type: 'Performance', period: 'January 2024', generated: '2024-01-31' },
];

const FinanceReports: React.FC = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const handleDownloadPDF = (report: any) => {
    toast.success(`Downloading ${report.name}...`);
  };

  const handleGenerateReport = () => {
    toast.success('Generating report...');
  };

  return (
    <DashboardLayout
      title="Financial Reports"
      subtitle="Generate and download financial reports"
    >
      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { icon: <FileText className="w-6 h-6" />, title: 'Collection Reports', desc: 'All collections and offerings' },
          { icon: <TrendingUp className="w-6 h-6" />, title: 'Financial Statements', desc: 'Income and expenditure' },
          { icon: <PieChart className="w-6 h-6" />, title: 'Budget Analysis', desc: 'Budget vs actual spending' },
          { icon: <BarChart3 className="w-6 h-6" />, title: 'Performance Reports', desc: 'Conference & district metrics' },
        ].map((type) => (
          <FloatCard key={type.title} hover className="cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary mb-4">
              {type.icon}
            </div>
            <h3 className="font-semibold text-foreground font-display">{type.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{type.desc}</p>
          </FloatCard>
        ))}
      </div>

      {/* Generated Reports */}
      <h2 className="text-lg font-semibold text-foreground font-display mb-4">Recent Reports</h2>
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Period</th>
                <th>Generated</th>
                <th></th>
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
                  <td className="text-muted-foreground">{report.type}</td>
                  <td className="text-muted-foreground">{report.period}</td>
                  <td className="text-muted-foreground">{report.generated}</td>
                  <td>
                    <div className="flex gap-2">
                      <FloatButton variant="ghost" size="sm" onClick={() => handleViewReport(report)}>
                        View
                      </FloatButton>
                      <FloatButton 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Download className="w-4 h-4" />}
                        onClick={() => handleDownloadPDF(report)}
                      >
                        PDF
                      </FloatButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatCard>

      {/* Generate New Report */}
      <FloatCard className="mt-8">
        <h3 className="text-lg font-semibold text-foreground font-display mb-4">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Report Type</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Collection Summary</option>
              <option>Remittance Report</option>
              <option>Financial Statement</option>
              <option>Performance Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Period</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>January 2024</option>
              <option>Q4 2023</option>
              <option>2023</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div className="flex items-end">
            <FloatButton variant="primary" className="w-full" onClick={handleGenerateReport}>
              Generate Report
            </FloatButton>
          </div>
        </div>
      </FloatCard>

      <ViewReportModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        report={selectedReport}
      />
    </DashboardLayout>
  );
};

export default FinanceReports;
