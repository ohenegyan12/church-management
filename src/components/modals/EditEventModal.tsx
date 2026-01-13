import React, { useState, useEffect } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { X, Calendar } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
  attendees: number;
  status: string;
}

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onSave: (event: Event) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ isOpen, onClose, event, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Conference',
    startDate: '',
    endDate: '',
    location: '',
    attendees: '',
    assignTo: 'All Conferences',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        type: event.type,
        startDate: '',
        endDate: '',
        location: event.location,
        attendees: event.attendees.toString(),
        assignTo: 'All Conferences',
      });
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onSave({
        ...event,
        title: formData.title,
        type: formData.type,
        location: formData.location,
        attendees: parseInt(formData.attendees) || 0,
      });
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">Edit Event</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FloatInput 
            label="Event Title" 
            placeholder="Annual Conference 2024" 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required 
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Event Type</label>
            <select 
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option>Conference</option>
              <option>Convention</option>
              <option>Celebration</option>
              <option>Summit</option>
              <option>Revival</option>
              <option>Workshop</option>
              <option>Service</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FloatInput 
              label="Start Date" 
              type="date" 
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <FloatInput 
              label="End Date" 
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
          <FloatInput 
            label="Location" 
            placeholder="Cape Coast" 
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required 
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Assign To</label>
            <select 
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.assignTo}
              onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
            >
              <option>All Conferences</option>
              <option>Greater Accra Conference</option>
              <option>Ashanti Conference</option>
              <option>Specific Districts</option>
            </select>
          </div>
          <FloatInput 
            label="Expected Attendees" 
            type="number" 
            placeholder="500"
            value={formData.attendees}
            onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
          />
          
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1" isLoading={isLoading}>
              Save Changes
            </FloatButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { EditEventModal };
