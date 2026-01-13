import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogoutModal } from '@/components/ui/LogoutModal';
import {
  LayoutDashboard,
  Church,
  Users,
  Wallet,
  FileText,
  Calendar,
  BarChart3,
  FolderOpen,
  Bell,
  UserCog,
  Settings,
  ChevronDown,
  ChevronRight,
  Building2,
  MapPin,
  Home,
  UserCheck,
  Briefcase,
  Receipt,
  CreditCard,
  TrendingUp,
  UserPlus,
  Mail,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  children?: { to: string; label: string }[];
}

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const NavItem: React.FC<NavItemProps & { collapsed?: boolean }> = ({ to, icon, label, badge, children, collapsed }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
  const hasChildren = children && children.length > 0;

  if (collapsed) {
    return (
      <NavLink
        to={hasChildren ? children[0].to : to}
        className={({ isActive }) =>
          cn(
            'flex items-center justify-center p-2 rounded-lg text-sidebar-muted group relative',
            'hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200',
            isActive && 'bg-sidebar-accent text-sidebar-foreground'
          )
        }
        title={label}
      >
        {icon}
        {badge && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-secondary" />
        )}
      </NavLink>
    );
  }

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-muted',
            'hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200',
            isActive && 'bg-sidebar-accent text-sidebar-foreground'
          )}
        >
          {icon}
          <span className="flex-1 text-left text-sm font-medium">{label}</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2 rounded-lg text-sm text-sidebar-muted',
                    'hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200',
                    isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium'
                  )
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-muted',
          'hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200',
          isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium'
        )
      }
    >
      {icon}
      <span className="flex-1 text-sm font-medium">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  const navigation = [
    { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    {
      to: '/church-structure',
      icon: <Church className="w-5 h-5" />,
      label: 'Church Structure',
      children: [
        { to: '/church-structure/conferences', label: 'Conferences' },
        { to: '/church-structure/districts', label: 'Districts' },
        { to: '/church-structure/societies', label: 'Local Societies' },
      ],
    },
    {
      to: '/members',
      icon: <Users className="w-5 h-5" />,
      label: 'Members',
      children: [
        { to: '/members/clergy', label: 'Clergy' },
        { to: '/members/lay-officers', label: 'Lay Officers' },
        { to: '/members/staff', label: 'Staff' },
      ],
    },
    {
      to: '/finance',
      icon: <Wallet className="w-5 h-5" />,
      label: 'Finance',
      children: [
        { to: '/finance/collections', label: 'Collections' },
        { to: '/finance/payments', label: 'Payments' },
        { to: '/finance/reports', label: 'Reports' },
      ],
    },
    {
      to: '/administration',
      icon: <Briefcase className="w-5 h-5" />,
      label: 'Administration',
      children: [
        { to: '/administration/hr', label: 'HR' },
        { to: '/administration/memos', label: 'Memos' },
        { to: '/administration/documents', label: 'Documents' },
        { to: '/administration/bulk-sms', label: 'Bulk SMS' },
      ],
    },
    { to: '/events', icon: <Calendar className="w-5 h-5" />, label: 'Events & Calendar' },
    { to: '/reports', icon: <BarChart3 className="w-5 h-5" />, label: 'Reports' },
    { to: '/users', icon: <UserCog className="w-5 h-5" />, label: 'Users & Roles' },
    { to: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar-bg text-sidebar-foreground"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 bg-sidebar-bg flex flex-col overflow-hidden transition-all duration-300',
          collapsed ? 'w-20' : 'w-72',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-sidebar-border",
          collapsed ? "justify-center" : "px-6"
        )}>
          <img src="/logo-new.avif" alt="AME Zion logo" className="h-10 w-10 object-contain" />
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <h1 className="text-lg font-bold text-sidebar-foreground font-display truncate">Church Management</h1>
              <p className="text-xs text-sidebar-muted truncate">Church Management</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto scrollbar-thin overflow-x-hidden">
          {navigation.map((item) => (
            <NavItem key={item.to} {...item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="hidden lg:flex justify-end p-4 border-t border-sidebar-border">
          <button
            onClick={onToggleCollapse}
            className={cn("p-2 rounded-lg text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all", collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <div className="flex items-center gap-2"><ChevronDown className="w-5 h-5 rotate-90" /><span className="text-xs font-medium uppercase">Minimize</span></div>}
          </button>
        </div>

        {/* User section */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className={cn("flex items-center gap-3 px-2 py-2", collapsed && "justify-center")}>
            <div className="h-10 w-10 min-w-[2.5rem] rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                  <p className="text-xs text-sidebar-muted truncate">Super Admin</p>
                </div>
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
                >
                  <LogOut className="w-4 h-4 text-sidebar-muted" />
                </button>
              </>
            )}
          </div>
        </div>

      </aside>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export { Sidebar };
