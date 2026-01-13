import React from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { X, Calendar, MapPin, Users, Clock, Edit, Trash2 } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
  attendees: number;
  status: string;
  description?: string;
}

interface ViewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ViewEventModal: React.FC<ViewEventModalProps> = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-lg mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Event Details</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <FloatBadge variant="primary">{event.type}</FloatBadge>
              <FloatBadge variant={event.status === 'upcoming' ? 'success' : 'outline'}>
                {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              </FloatBadge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{event.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expected Attendees</p>
                <p className="font-medium text-foreground">{event.attendees.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {event.description && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-foreground">{event.description}</p>
            </div>
          )}
          
          <div className="flex gap-3 pt-4 border-t border-border">
            <FloatButton variant="outline" className="flex-1" onClick={onEdit} leftIcon={<Edit className="w-4 h-4" />}>
              Edit
            </FloatButton>
            <FloatButton variant="destructive" className="flex-1" onClick={onDelete} leftIcon={<Trash2 className="w-4 h-4" />}>
              Delete
            </FloatButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewEventModal };
