import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { Plus, Search, Filter, Mail, Send, Eye, Clock, CheckCircle, FileText, X } from 'lucide-react';
import { toast } from 'sonner';

const memos = [
  { id: 1, subject: 'Annual Conference Meeting Notice', from: 'Bishop Emmanuel Asante', to: 'All Presiding Elders', date: '2024-01-15', priority: 'high', status: 'sent', read: 45 },
  { id: 2, subject: 'Budget Submission Deadline Reminder', from: 'Finance Department', to: 'All Conferences', date: '2024-01-14', priority: 'medium', status: 'sent', read: 32 },
  { id: 3, subject: 'New Staff Orientation Schedule', from: 'HR Department', to: 'All Staff', date: '2024-01-13', priority: 'low', status: 'draft', read: 0 },
  { id: 4, subject: 'Easter Program Guidelines', from: 'Christian Education', to: 'All Societies', date: '2024-01-12', priority: 'medium', status: 'sent', read: 128 },
  { id: 5, subject: 'IT System Maintenance Notice', from: 'IT Department', to: 'All Users', date: '2024-01-11', priority: 'high', status: 'sent', read: 89 },
];

interface CreateMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMemoModal: React.FC<CreateMemoModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    to: '',
    priority: 'medium',
    content: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Memo created successfully');
      onClose();
      setFormData({ subject: '', to: '', priority: 'medium', content: '' });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Create Memo</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FloatInput
            label="Subject"
            placeholder="Enter memo subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Recipients</label>
            <select
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select recipients</option>
              <option value="All Staff">All Staff</option>
              <option value="All Presiding Elders">All Presiding Elders</option>
              <option value="All Conferences">All Conferences</option>
              <option value="All Societies">All Societies</option>
              <option value="All Users">All Users</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your memo content..."
              rows={6}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Save as Draft
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading} leftIcon={<Send className="w-4 h-4" />}>
              Send Memo
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ViewMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  memo: any;
}

const ViewMemoModal: React.FC<ViewMemoModalProps> = ({ isOpen, onClose, memo }) => {
  if (!isOpen || !memo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-lg mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Memo Details</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground font-display">{memo.subject}</h3>
            <div className="flex items-center gap-2 mt-2">
              <FloatBadge variant={memo.priority === 'high' ? 'destructive' : memo.priority === 'medium' ? 'warning' : 'default'}>
                {memo.priority.charAt(0).toUpperCase() + memo.priority.slice(1)} Priority
              </FloatBadge>
              <FloatBadge variant={memo.status === 'sent' ? 'success' : 'outline'}>
                {memo.status === 'sent' ? 'Sent' : 'Draft'}
              </FloatBadge>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Send className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium text-foreground">{memo.from}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium text-foreground">{memo.to}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{memo.date}</p>
              </div>
            </div>
            {memo.status === 'sent' && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success-light">
                <Eye className="w-4 h-4 text-success" />
                <div>
                  <p className="text-sm text-success">Read by</p>
                  <p className="font-medium text-success">{memo.read} recipients</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-muted/30 mb-6">
            <p className="text-muted-foreground">
              This is a sample memo content. The full memo content would be displayed here with all the details and instructions included in the original memo.
            </p>
          </div>

          <FloatButton variant="outline" className="w-full" onClick={onClose}>
            Close
          </FloatButton>
        </div>
      </div>
    </div>
  );
};

const Memos: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState<any>(null);

  const handleViewMemo = (memo: any) => {
    setSelectedMemo(memo);
    setIsViewModalOpen(true);
  };

  return (
    <DashboardLayout
      title="Memos"
      subtitle="Create and manage internal communications"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <FloatCard className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary mb-2">
            <Mail className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground font-display">156</p>
          <p className="text-sm text-muted-foreground">Total Memos</p>
        </FloatCard>
        <FloatCard className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-success-light text-success mb-2">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground font-display">142</p>
          <p className="text-sm text-muted-foreground">Sent</p>
        </FloatCard>
        <FloatCard className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-warning-light text-warning mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground font-display">14</p>
          <p className="text-sm text-muted-foreground">Drafts</p>
        </FloatCard>
        <FloatCard className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent mb-2">
            <Eye className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground font-display">89%</p>
          <p className="text-sm text-muted-foreground">Read Rate</p>
        </FloatCard>
      </div>

      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex gap-3 flex-1 max-w-lg">
          <FloatInput
            placeholder="Search memos..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <FloatButton variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsCreateModalOpen(true)}>
          Create Memo
        </FloatButton>
      </div>

      {/* Memos Table */}
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {memos.map((memo) => (
                <tr key={memo.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{memo.subject}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{memo.from}</td>
                  <td className="text-muted-foreground">{memo.to}</td>
                  <td className="text-muted-foreground">{memo.date}</td>
                  <td>
                    <FloatBadge variant={memo.priority === 'high' ? 'destructive' : memo.priority === 'medium' ? 'warning' : 'default'}>
                      {memo.priority.charAt(0).toUpperCase() + memo.priority.slice(1)}
                    </FloatBadge>
                  </td>
                  <td>
                    <FloatBadge variant={memo.status === 'sent' ? 'success' : 'outline'}>
                      {memo.status === 'sent' ? 'Sent' : 'Draft'}
                    </FloatBadge>
                  </td>
                  <td>
                    <FloatButton variant="ghost" size="sm" onClick={() => handleViewMemo(memo)}>
                      View
                    </FloatButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatCard>

      <CreateMemoModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <ViewMemoModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} memo={selectedMemo} />
    </DashboardLayout>
  );
};

export default Memos;
