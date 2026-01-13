import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { Plus, Search, Filter, FileText, Download, Eye, Folder, File, Upload, X, Image, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

const documents = [
  { id: 1, name: 'Church Constitution 2024', type: 'PDF', category: 'Legal', size: '2.4 MB', uploadedBy: 'Admin', date: '2024-01-15', downloads: 156 },
  { id: 2, name: 'Annual Budget Template', type: 'Excel', category: 'Finance', size: '856 KB', uploadedBy: 'Finance Dept', date: '2024-01-14', downloads: 89 },
  { id: 3, name: 'Staff Handbook', type: 'PDF', category: 'HR', size: '1.8 MB', uploadedBy: 'HR Dept', date: '2024-01-13', downloads: 234 },
  { id: 4, name: 'Logo Guidelines', type: 'PDF', category: 'Branding', size: '5.2 MB', uploadedBy: 'Communications', date: '2024-01-12', downloads: 67 },
  { id: 5, name: 'Event Planning Checklist', type: 'Word', category: 'Operations', size: '124 KB', uploadedBy: 'Admin', date: '2024-01-11', downloads: 198 },
  { id: 6, name: 'Conference Photos 2023', type: 'ZIP', category: 'Media', size: '45.8 MB', uploadedBy: 'Media Team', date: '2024-01-10', downloads: 312 },
];

const categories = [
  { name: 'All Documents', count: 156, icon: <Folder className="w-5 h-5" /> },
  { name: 'Legal', count: 12, icon: <FileText className="w-5 h-5" /> },
  { name: 'Finance', count: 34, icon: <FileSpreadsheet className="w-5 h-5" /> },
  { name: 'HR', count: 28, icon: <File className="w-5 h-5" /> },
  { name: 'Media', count: 45, icon: <Image className="w-5 h-5" /> },
];

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Document uploaded successfully');
      onClose();
      setFormData({ name: '', category: '', description: '' });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Upload className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Upload Document</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground mt-1">PDF, Word, Excel, Images up to 50MB</p>
          </div>

          <FloatInput
            label="Document Name"
            placeholder="Enter document name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              <option value="Legal">Legal</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Branding">Branding</option>
              <option value="Operations">Operations</option>
              <option value="Media">Media</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading}>
              Upload
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ViewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: any;
}

const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({ isOpen, onClose, document: doc }) => {
  if (!isOpen || !doc) return null;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-8 h-8" />;
      case 'Excel': return <FileSpreadsheet className="w-8 h-8" />;
      case 'Image': return <Image className="w-8 h-8" />;
      default: return <File className="w-8 h-8" />;
    }
  };

  const handleDownload = () => {
    toast.success(`Downloading ${doc.name}...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
              {getFileIcon(doc.type)}
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Document Details</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6 p-6 rounded-lg bg-muted/50">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary-light text-primary mb-3">
              {getFileIcon(doc.type)}
            </div>
            <h3 className="text-lg font-bold text-foreground font-display">{doc.name}</h3>
            <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-muted-foreground">Category</span>
              <FloatBadge variant="outline">{doc.category}</FloatBadge>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-muted-foreground">Uploaded by</span>
              <span className="font-medium text-foreground">{doc.uploadedBy}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium text-foreground">{doc.date}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-muted-foreground">Downloads</span>
              <span className="font-medium text-foreground">{doc.downloads}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <FloatButton variant="outline" className="flex-1" onClick={onClose}>
              Close
            </FloatButton>
            <FloatButton variant="primary" className="flex-1" leftIcon={<Download className="w-4 h-4" />} onClick={handleDownload}>
              Download
            </FloatButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const Documents: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('All Documents');

  const handleViewDocument = (doc: any) => {
    setSelectedDocument(doc);
    setIsViewModalOpen(true);
  };

  const handleDownload = (doc: any) => {
    toast.success(`Downloading ${doc.name}...`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-destructive" />;
      case 'Excel': return <FileSpreadsheet className="w-5 h-5 text-success" />;
      case 'Word': return <File className="w-5 h-5 text-primary" />;
      case 'ZIP': return <Folder className="w-5 h-5 text-warning" />;
      default: return <File className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout
      title="Documents"
      subtitle="Manage and share organizational documents"
    >
      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {categories.map((cat) => (
          <FloatCard 
            key={cat.name} 
            hover 
            className={`cursor-pointer ${selectedCategory === cat.name ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                {cat.icon}
              </div>
              <div>
                <p className="font-medium text-foreground">{cat.name}</p>
                <p className="text-sm text-muted-foreground">{cat.count} files</p>
              </div>
            </div>
          </FloatCard>
        ))}
      </div>

      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex gap-3 flex-1 max-w-lg">
          <FloatInput
            placeholder="Search documents..."
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <FloatButton variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </FloatButton>
        </div>
        <FloatButton variant="primary" leftIcon={<Upload className="w-4 h-4" />} onClick={() => setIsUploadModalOpen(true)}>
          Upload Document
        </FloatButton>
      </div>

      {/* Documents Table */}
      <FloatCard padding="none">
        <div className="overflow-x-auto">
          <table className="float-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Size</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Downloads</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{doc.name}</span>
                        <p className="text-xs text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <FloatBadge variant="outline">{doc.category}</FloatBadge>
                  </td>
                  <td className="text-muted-foreground">{doc.size}</td>
                  <td className="text-muted-foreground">{doc.uploadedBy}</td>
                  <td className="text-muted-foreground">{doc.date}</td>
                  <td className="text-muted-foreground">{doc.downloads}</td>
                  <td>
                    <div className="flex gap-2">
                      <FloatButton variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />} onClick={() => handleViewDocument(doc)}>
                        View
                      </FloatButton>
                      <FloatButton variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={() => handleDownload(doc)}>
                        Download
                      </FloatButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatCard>

      <UploadDocumentModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
      <ViewDocumentModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} document={selectedDocument} />
    </DashboardLayout>
  );
};

export default Documents;
