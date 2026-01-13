import React from 'react';
import { Sidebar } from './Sidebar';
import { NotificationsModal } from '@/components/modals/NotificationsModal';
import { Bell, Search } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, subtitle }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-6">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative max-w-md flex-1 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
          </div>
        </header>

        {/* Page header */}
        {(title || subtitle) && (
          <div className="px-6 py-6 border-b border-border bg-card">
            {title && <h1 className="text-2xl font-bold text-foreground font-display">{title}</h1>}
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto min-h-0">
          {children}
        </main>
      </div>

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};

export { DashboardLayout };
