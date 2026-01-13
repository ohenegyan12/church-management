import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { Plus, Search, Church, MoreVertical, ChevronRight, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { FloatInput } from '@/components/ui/FloatInput';
import { useNavigate } from 'react-router-dom';
import { AddConferenceModal } from '@/components/modals/AddConferenceModal';
import { EditConferenceModal } from '@/components/modals/EditConferenceModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';

const conferences = [
  {
    id: 1,
    name: 'Greater Accra Conference',
    bishop: 'Rt. Rev. Emmanuel Asante',
    districts: 8,
    societies: 124,
    members: 15420,
    status: 'active',
    email: 'accra@amezion.gh',
    phone: '+233 30 222 3333',
    address: 'P.O. Box GP 1234, Accra',
    region: 'Greater Accra Region',
  },
  {
    id: 2,
    name: 'Ashanti Conference',
    bishop: 'Rt. Rev. Kwame Mensah',
    districts: 6,
    societies: 98,
    members: 12350,
    status: 'active',
    email: 'ashanti@amezion.gh',
    phone: '+233 32 222 4444',
    address: 'P.O. Box KS 5678, Kumasi',
    region: 'Ashanti Region',
  },
  {
    id: 3,
    name: 'Central Region Conference',
    bishop: 'Rt. Rev. Samuel Osei',
    districts: 5,
    societies: 76,
    members: 8920,
    status: 'active',
    email: 'central@amezion.gh',
    phone: '+233 33 222 5555',
    address: 'P.O. Box CC 9012, Cape Coast',
    region: 'Central Region',
  },
  {
    id: 4,
    name: 'Northern Conference',
    bishop: 'Rt. Rev. Ibrahim Yakubu',
    districts: 4,
    societies: 52,
    members: 6240,
    status: 'active',
    email: 'northern@amezion.gh',
    phone: '+233 37 222 6666',
    address: 'P.O. Box TL 3456, Tamale',
    region: 'Northern Region',
  },
  {
    id: 5,
    name: 'Western Conference',
    bishop: 'Rt. Rev. Francis Adu',
    districts: 5,
    societies: 68,
    members: 7890,
    status: 'active',
    email: 'western@amezion.gh',
    phone: '+233 31 222 7777',
    address: 'P.O. Box TK 7890, Takoradi',
    region: 'Western Region',
  },
];

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
  onReport: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, onEdit, onView, onDelete, onReport }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-50 py-1 animate-scale-in"
    >
      <button
        onClick={onView}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
      >
        <Eye className="w-4 h-4 text-muted-foreground" />
        View Details
      </button>
      <button
        onClick={onEdit}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
      >
        <Edit className="w-4 h-4 text-muted-foreground" />
        Edit Conference
      </button>
      <button
        onClick={onReport}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
      >
        <FileText className="w-4 h-4 text-muted-foreground" />
        View Report
      </button>
      <div className="border-t border-border my-1" />
      <button
        onClick={onDelete}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive-light transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Delete Conference
      </button>
    </div>
  );
};

const Conferences: React.FC = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState<typeof conferences[0] | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleEdit = (conference: typeof conferences[0]) => {
    setSelectedConference(conference);
    setIsEditModalOpen(true);
    setOpenDropdown(null);
  };

  const handleView = (id: number) => {
    navigate(`/church-structure/conferences/${id}`);
    setOpenDropdown(null);
  };

  const handleDelete = (conference: typeof conferences[0]) => {
    setSelectedConference(conference);
    setIsDeleteModalOpen(true);
    setOpenDropdown(null);
  };

  const confirmDelete = () => {
    // TODO: Implement actual delete logic with database
    console.log('Conference deleted:', selectedConference?.name);
    setSelectedConference(null);
  };

  const handleReport = (id: number) => {
    navigate(`/reports?conference=${id}`);
    setOpenDropdown(null);
  };

  return (
    <DashboardLayout
      title="Conferences"
      subtitle="Manage all conferences under the Ghana Episcopacy"
    >
      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="relative max-w-sm flex-1">
          <FloatInput
            placeholder="Search conferences..."
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <FloatButton 
          variant="primary" 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Conference
        </FloatButton>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Conferences', value: '5' },
          { label: 'Total Districts', value: '28' },
          { label: 'Total Societies', value: '418' },
          { label: 'Total Members', value: '50,820' },
        ].map((stat) => (
          <FloatCard key={stat.label} className="text-center py-6">
            <p className="text-3xl font-bold text-primary font-display">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </FloatCard>
        ))}
      </div>

      {/* Conferences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {conferences.map((conference, index) => (
          <FloatCard
            key={conference.id}
            hover
            className="animate-slide-in-up cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => navigate(`/church-structure/conferences/${conference.id}`)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Church className="w-6 h-6" />
              </div>
              <div className="relative">
                <button 
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(openDropdown === conference.id ? null : conference.id);
                  }}
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
                <DropdownMenu
                  isOpen={openDropdown === conference.id}
                  onClose={() => setOpenDropdown(null)}
                  onEdit={() => handleEdit(conference)}
                  onView={() => handleView(conference.id)}
                  onDelete={() => handleDelete(conference)}
                  onReport={() => handleReport(conference.id)}
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground font-display mb-1">
              {conference.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{conference.bishop}</p>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xl font-bold text-foreground font-display">{conference.districts}</p>
                <p className="text-xs text-muted-foreground">Districts</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground font-display">{conference.societies}</p>
                <p className="text-xs text-muted-foreground">Societies</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground font-display">{conference.members.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <FloatBadge variant="success">Active</FloatBadge>
              <span className="text-sm text-primary font-medium flex items-center gap-1">
                View Details <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </FloatCard>
        ))}
      </div>

      {/* Modals */}
      <AddConferenceModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditConferenceModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedConference(null);
        }} 
        conference={selectedConference}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedConference(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Conference"
        itemName={selectedConference?.name || ''}
        description="This will permanently remove the conference and all its associated data."
      />
    </DashboardLayout>
  );
};

export default Conferences;
