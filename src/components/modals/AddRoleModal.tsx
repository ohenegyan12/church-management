import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield } from 'lucide-react';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (role: any) => void;
}

const permissionOptions = [
  { id: 'view_dashboard', label: 'View Dashboard' },
  { id: 'manage_users', label: 'Manage Users' },
  { id: 'manage_members', label: 'Manage Members' },
  { id: 'manage_clergy', label: 'Manage Clergy' },
  { id: 'manage_finance', label: 'Manage Finance' },
  { id: 'manage_events', label: 'Manage Events' },
  { id: 'manage_reports', label: 'Generate Reports' },
  { id: 'manage_settings', label: 'Manage Settings' },
];

export const AddRoleModal: React.FC<AddRoleModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    } else {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permissionId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const permissionsText = selectedPermissions.length > 0
      ? permissionOptions
          .filter((p) => selectedPermissions.includes(p.id))
          .map((p) => p.label)
          .join(', ')
      : 'No permissions';
    
    onAdd({
      name,
      users: 0,
      permissions: permissionsText,
    });
    setName('');
    setSelectedPermissions([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground font-display">Add New Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-foreground">Role Name</Label>
            <FloatInput
              placeholder="Enter role name"
              leftIcon={<Shield className="w-4 h-4" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Permissions</Label>
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg border border-border bg-background">
              {permissionOptions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={(checked) =>
                      handlePermissionChange(permission.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={permission.id}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {permission.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <FloatButton type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </FloatButton>
            <FloatButton type="submit" variant="primary" className="flex-1">
              Add Role
            </FloatButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
