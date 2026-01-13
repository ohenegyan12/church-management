
import React from 'react';
import { X, Bell, Calendar, DollarSign, UserPlus, FileText, CheckCircle } from 'lucide-react';
import { FloatBadge } from '@/components/ui/FloatBadge'; /* assuming FloatBadge exists based on other files */

interface NotificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const notifications = [
    {
        id: 1,
        title: 'New Member Registered',
        message: 'Kwame Mensah has been registered as a new member in Accra Central Society.',
        time: '10 mins ago',
        type: 'member',
        read: false,
    },
    {
        id: 2,
        title: 'Donation Received',
        message: 'GH₵ 5,000.00 received from Anonymous Donor for Church Building Fund.',
        time: '1 hour ago',
        type: 'finance',
        read: false,
    },
    {
        id: 3,
        title: 'Upcoming Event Reminder',
        message: 'Quarterly Leaders Meeting is scheduled for tomorrow at 10:00 AM.',
        time: '2 hours ago',
        type: 'event',
        read: true,
    },
    {
        id: 4,
        title: 'Report Submission',
        message: 'Q1 Financial Report for Kumasi District has been submitted for review.',
        time: '1 day ago',
        type: 'report',
        read: true,
    },
    {
        id: 5,
        title: 'System Update',
        message: 'The system has been successfully updated to version 2.4.0.',
        time: '2 days ago',
        type: 'system',
        read: true,
    }
];

const getIcon = (type: string) => {
    switch (type) {
        case 'member': return <UserPlus className="w-4 h-4" />;
        case 'finance': return <DollarSign className="w-4 h-4" />;
        case 'event': return <Calendar className="w-4 h-4" />;
        case 'report': return <FileText className="w-4 h-4" />;
        case 'system': return <CheckCircle className="w-4 h-4" />;
        default: return <Bell className="w-4 h-4" />;
    }
};

const getColor = (type: string) => {
    switch (type) {
        case 'member': return 'bg-blue-100 text-blue-600';
        case 'finance': return 'bg-green-100 text-green-600';
        case 'event': return 'bg-orange-100 text-orange-600';
        case 'report': return 'bg-purple-100 text-purple-600';
        case 'system': return 'bg-gray-100 text-gray-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Bell className="w-5 h-5 text-foreground" />
                            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-card"></span>
                        </div>
                        <h2 className="text-lg font-semibold text-foreground font-display">Notifications</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-0 flex-1">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-border">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer flex gap-4 ${!notification.read ? 'bg-primary/5' : ''}`}
                                >
                                    <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${getColor(notification.type)}`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'} text-foreground`}>
                                                {notification.title}
                                            </p>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {notification.message}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="shrink-0 self-center">
                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                <Bell className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <p className="text-foreground font-medium">No notifications yet</p>
                            <p className="text-sm text-muted-foreground mt-1">We'll notify you when something important happens.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-muted/20">
                    <button className="w-full py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                        Mark all as read
                    </button>
                </div>
            </div>
        </div>
    );
};

export { NotificationsModal };
