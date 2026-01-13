import React, { useState } from 'react';
import { FloatButton } from '@/components/ui/FloatButton';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  description?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title,
  itemName,
  description 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  const handleDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onConfirm();
      onClose();
      setConfirmText('');
    }, 1000);
  };

  const isConfirmDisabled = confirmText.toLowerCase() !== 'delete';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive-light text-destructive">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground font-display">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-foreground">
            Are you sure you want to delete <span className="font-semibold">{itemName}</span>?
          </p>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
          
          <div className="mt-4 p-4 rounded-lg bg-destructive-light border border-destructive/20">
            <p className="text-sm text-destructive font-medium">Warning: This action cannot be undone.</p>
            <p className="text-sm text-destructive/80 mt-1">
              All associated data including districts, societies, and member records linked to this conference will be affected.
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Type <span className="font-semibold">delete</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <FloatButton 
              type="button" 
              variant="outline" 
              className="flex-1" 
              onClick={() => {
                onClose();
                setConfirmText('');
              }}
            >
              Cancel
            </FloatButton>
            <FloatButton 
              type="button" 
              variant="destructive" 
              className="flex-1" 
              isLoading={isLoading}
              disabled={isConfirmDisabled}
              onClick={handleDelete}
            >
              Delete
            </FloatButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DeleteConfirmModal };
