import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { X, FileText, Download } from 'lucide-react';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Generate Report</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Report Type</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Financial Summary</option>
              <option>Collection Report</option>
              <option>Membership Report</option>
              <option>Conference Performance</option>
              <option>District Performance</option>
              <option>Event Attendance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Period</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>Last Quarter</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Scope</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Conferences</option>
              <option>Greater Accra Conference</option>
              <option>Ashanti Conference</option>
              <option>Central Region Conference</option>
              <option>Northern Conference</option>
              <option>Western Conference</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Format</label>
            <div className="flex gap-3">
              <label className="flex-1 flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted transition-colors">
                <input type="radio" name="format" defaultChecked className="text-primary" />
                <span className="text-sm text-foreground">PDF</span>
              </label>
              <label className="flex-1 flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted transition-colors">
                <input type="radio" name="format" className="text-primary" />
                <span className="text-sm text-foreground">Excel</span>
              </label>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading} leftIcon={<Download className="w-4 h-4" />}>
              Generate
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { GenerateReportModal };
