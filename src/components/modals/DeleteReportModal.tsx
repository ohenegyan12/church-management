import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { X, AlertTriangle, FileText } from 'lucide-react';

interface Report {
  id: number;
  name: string;
  type: string;
  generated: string;
  size: string;
}

interface DeleteReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
  onConfirm: (reportId: number) => void;
}

const DeleteReportModal: React.FC<DeleteReportModalProps> = ({ isOpen, onClose, report, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !report) return null;

  const handleDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      onConfirm(report.id);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Delete Report</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-muted-foreground mb-4">
            Are you sure you want to delete <span className="font-semibold text-foreground">"{report.name}"</span>? This action cannot be undone.
          </p>
          
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{report.name}</p>
                <p className="text-sm text-muted-foreground">{report.type} • {report.size} • {report.generated}</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton 
              type="button" 
              variant="destructive" 
              className="flex-1" 
              onClick={handleDelete}
              isLoading={isLoading}
            >
              Delete Report
            </FloatButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DeleteReportModal };
