import React from 'react';
import { FloatButton } from './FloatButton';
import { LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-xl shadow-xl border border-border p-6 w-full max-w-md mx-4 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive-light mx-auto mb-4">
          <LogOut className="w-8 h-8 text-destructive" />
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground font-display mb-2">
            Sign Out
          </h2>
          <p className="text-muted-foreground">
            Are you sure you want to sign out of your account? You'll need to sign in again to access the system.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <FloatButton 
            variant="outline" 
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </FloatButton>
          <FloatButton 
            variant="destructive" 
            className="flex-1"
            onClick={onConfirm}
          >
            Sign Out
          </FloatButton>
        </div>
      </div>
    </div>
  );
};

export { LogoutModal };
