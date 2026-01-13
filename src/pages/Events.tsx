import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { CreateEventModal } from '@/components/modals/CreateEventModal';
import { ViewEventModal } from '@/components/modals/ViewEventModal';
import { EditEventModal } from '@/components/modals/EditEventModal';
import { DeleteEventModal } from '@/components/modals/DeleteEventModal';
import { Plus, MapPin, Users, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
  attendees: number;
  status: string;
  day?: number;
  month?: number;
  year?: number;
}

const initialEvents: Event[] = [
  { id: 1, title: 'Annual Conference 2024', date: 'Mar 15-18, 2024', location: 'Cape Coast', type: 'Conference', attendees: 1200, status: 'upcoming', day: 15, month: 2, year: 2024 },
  { id: 2, title: 'Youth Convention', date: 'Apr 5-7, 2024', location: 'Kumasi', type: 'Convention', attendees: 500, status: 'upcoming', day: 5, month: 3, year: 2024 },
  { id: 3, title: "Founder's Day Celebration", date: 'May 12, 2024', location: 'All Districts', type: 'Celebration', attendees: 10000, status: 'upcoming', day: 12, month: 4, year: 2024 },
  { id: 4, title: 'Leadership Summit', date: 'Jun 8-10, 2024', location: 'Accra', type: 'Summit', attendees: 300, status: 'upcoming', day: 8, month: 5, year: 2024 },
  { id: 5, title: 'District Revival', date: 'Feb 20-22, 2024', location: 'Tema', type: 'Revival', attendees: 800, status: 'upcoming', day: 20, month: 1, year: 2024 },
  { id: 6, title: 'New Year Service', date: 'Jan 5, 2024', location: 'All Churches', type: 'Service', attendees: 15000, status: 'upcoming', day: 5, month: 0, year: 2024 },
];

const Events: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const goToNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const getEventsForDay = (day: number) => {
    return events.filter(
      (event) => event.day === day && event.month === currentDate.getMonth() && event.year === currentDate.getFullYear()
    );
  };

  const handleDayClick = (day: number) => {
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length > 0) {
      setSelectedEvent(dayEvents[0]);
      setIsViewModalOpen(true);
    }
    setSelectedDay(day);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEvent = (updatedEvent: Event) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    toast({
      title: "Event Updated",
      description: `"${updatedEvent.title}" has been updated successfully.`,
    });
  };

  const handleConfirmDelete = (eventId: number) => {
    const eventToDelete = events.find(e => e.id === eventId);
    setEvents(events.filter(e => e.id !== eventId));
    toast({
      title: "Event Deleted",
      description: `"${eventToDelete?.title}" has been deleted.`,
      variant: "destructive",
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const upcomingEvents = events.filter((event) => event.status === 'upcoming');

  return (
    <DashboardLayout
      title="Events & Calendar"
      subtitle="Manage church events, conferences, and celebrations"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-2">
          <FloatCard>
            {/* Year Navigation */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <FloatButton variant="ghost" size="sm" onClick={goToPreviousYear}>
                <ChevronLeft className="w-4 h-4" />
                <ChevronLeft className="w-4 h-4 -ml-2" />
              </FloatButton>
              <span className="text-lg font-bold text-foreground font-display min-w-[80px] text-center">
                {currentYear}
              </span>
              <FloatButton variant="ghost" size="sm" onClick={goToNextYear}>
                <ChevronRight className="w-4 h-4" />
                <ChevronRight className="w-4 h-4 -ml-2" />
              </FloatButton>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <FloatButton variant="outline" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="w-4 h-4" />
              </FloatButton>
              <h2 className="text-lg font-semibold text-foreground font-display">
                {currentMonth} {currentYear}
              </h2>
              <FloatButton variant="outline" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="w-4 h-4" />
              </FloatButton>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => (
                <div key={day} className="text-center py-2 text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                const hasEvent = dayEvents.length > 0;
                const isSelected = selectedDay === day;
                const isToday = day === new Date().getDate() && 
                  currentDate.getMonth() === new Date().getMonth() && 
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors cursor-pointer
                      ${isToday ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                      ${isSelected && !isToday ? 'ring-2 ring-primary' : ''}
                    `}
                  >
                    {day}
                    {hasEvent && (
                      <div className="flex gap-0.5 mt-1">
                        {dayEvents.slice(0, 3).map((_, idx) => (
                          <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-primary-foreground' : 'bg-secondary'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </FloatCard>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground font-display">Upcoming Events</h2>
            <FloatButton 
              variant="primary" 
              size="sm" 
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Add Event
            </FloatButton>
          </div>

          <div className="space-y-4">
            {upcomingEvents.slice(0, 4).map((event) => (
              <FloatCard 
                key={event.id} 
                hover 
                className="cursor-pointer"
                onClick={() => handleViewEvent(event)}
              >
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-secondary text-secondary-foreground shrink-0">
                    <span className="text-xs font-medium">{event.date.split(' ')[0].slice(0, 3)}</span>
                    <span className="text-lg font-bold">{event.date.split(' ')[1].split('-')[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{event.title}</h3>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <FloatBadge variant="primary">{event.type}</FloatBadge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.attendees.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </FloatCard>
            ))}
          </div>
        </div>
      </div>

      {/* All Events Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground font-display mb-4">All Events</h2>
        <FloatCard padding="none">
          <div className="overflow-x-auto">
            <table className="float-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Expected Attendees</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="font-medium text-foreground">{event.title}</td>
                    <td>
                      <FloatBadge variant="outline">{event.type}</FloatBadge>
                    </td>
                    <td className="text-muted-foreground">{event.date}</td>
                    <td className="text-muted-foreground">{event.location}</td>
                    <td className="text-muted-foreground">{event.attendees.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <FloatButton 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewEvent(event)}
                        >
                          <Eye className="w-4 h-4" />
                        </FloatButton>
                        <FloatButton variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                          <Edit className="w-4 h-4" />
                        </FloatButton>
                        <FloatButton variant="ghost" size="sm" onClick={() => handleDeleteEvent(event)}>
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
      </div>

      {/* Modals */}
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      <ViewEventModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        event={selectedEvent}
        onEdit={() => {
          setIsViewModalOpen(false);
          if (selectedEvent) handleEditEvent(selectedEvent);
        }}
        onDelete={() => {
          setIsViewModalOpen(false);
          if (selectedEvent) handleDeleteEvent(selectedEvent);
        }}
      />
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        event={selectedEvent}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  );
};

export default Events;
