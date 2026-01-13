import React from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { X, FileText, Download, Printer, Calendar, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

interface ViewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: any;
}

const ViewReportModal: React.FC<ViewReportModalProps> = ({ isOpen, onClose, report }) => {
  if (!isOpen || !report) return null;

  const handlePrint = () => {
    window.print();
    toast.success('Printing report...');
  };

  const handleDownload = () => {
    toast.success('Report downloaded successfully');
  };

  // Mock data for report preview
  const summaryData = {
    'Collections': {
      totalAmount: 'GH₵ 245,680',
      transactions: 156,
      growth: '+18%',
      topSource: 'Greater Accra Conference',
    },
    'Remittance': {
      totalAmount: 'GH₵ 156,200',
      transactions: 48,
      growth: '+12%',
      topSource: 'Ashanti Conference',
    },
    'Financial': {
      totalAmount: 'GH₵ 1,245,000',
      transactions: 892,
      growth: '+22%',
      topSource: 'All Conferences',
    },
    'Performance': {
      totalAmount: 'GH₵ 89,480',
      transactions: 64,
      growth: '+8%',
      topSource: 'Kumasi Metro District',
    },
  };

  const data = summaryData[report.type as keyof typeof summaryData] || summaryData['Collections'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground font-display">{report.name}</h2>
              <p className="text-sm text-muted-foreground">{report.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Report Header */}
          <div className="text-center mb-6 pb-6 border-b border-dashed border-border">
            <h3 className="text-xl font-bold text-foreground font-display">AME Zion Church Ghana</h3>
            <p className="text-sm text-muted-foreground">{report.type} Report</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <FloatBadge variant="primary">{report.period}</FloatBadge>
              <FloatBadge variant="outline">Generated: {report.generated}</FloatBadge>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-success-light">
              <p className="text-sm text-success">Total Amount</p>
              <p className="text-2xl font-bold text-success font-display">{data.totalAmount}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary-light">
              <p className="text-sm text-primary">Transactions</p>
              <p className="text-2xl font-bold text-primary font-display">{data.transactions}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <TrendingUp className="w-5 h-5 text-success" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="font-medium text-foreground">{data.growth} from previous period</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Building2 className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Top Contributing Source</p>
                <p className="font-medium text-foreground">{data.topSource}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Report Period</p>
                <p className="font-medium text-foreground">{report.period}</p>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Breakdown by Category</h4>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-foreground">Category</th>
                    <th className="px-4 py-2 text-right text-foreground">Amount</th>
                    <th className="px-4 py-2 text-right text-foreground">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2 text-muted-foreground">25% Remittance</td>
                    <td className="px-4 py-2 text-right text-foreground">GH₵ 98,500</td>
                    <td className="px-4 py-2 text-right text-muted-foreground">40%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2 text-muted-foreground">Special Offerings</td>
                    <td className="px-4 py-2 text-right text-foreground">GH₵ 73,700</td>
                    <td className="px-4 py-2 text-right text-muted-foreground">30%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2 text-muted-foreground">General Donations</td>
                    <td className="px-4 py-2 text-right text-foreground">GH₵ 49,136</td>
                    <td className="px-4 py-2 text-right text-muted-foreground">20%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2 text-muted-foreground">Other</td>
                    <td className="px-4 py-2 text-right text-foreground">GH₵ 24,344</td>
                    <td className="px-4 py-2 text-right text-muted-foreground">10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <FloatButton 
              type="button" 
              variant="outline" 
              className="flex-1" 
              leftIcon={<Printer className="w-4 h-4" />}
              onClick={handlePrint}
            >
              Print
            </FloatButton>
            <FloatButton 
              type="button" 
              variant="primary" 
              className="flex-1" 
              leftIcon={<Download className="w-4 h-4" />}
              onClick={handleDownload}
            >
              Download PDF
            </FloatButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewReportModal };
