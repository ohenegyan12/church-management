import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { FloatInput } from '@/components/ui/FloatInput';
import { Plus, Search, Shield, UserCog, Users as UsersIcon, Key } from 'lucide-react';
import { AddUserModal } from '@/components/modals/AddUserModal';
import { EditUserModal } from '@/components/modals/EditUserModal';
import { AddRoleModal } from '@/components/modals/AddRoleModal';
import { useToast } from '@/hooks/use-toast';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@amezion.gh', role: 'Super Admin', lastActive: '2 mins ago', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@amezion.gh', role: 'Finance Officer', lastActive: '1 hour ago', status: 'active' },
  { id: 3, name: 'Peter Mensah', email: 'p.mensah@amezion.gh', role: 'Conference Admin', lastActive: '3 hours ago', status: 'active' },
  { id: 4, name: 'Grace Asante', email: 'g.asante@amezion.gh', role: 'District Admin', lastActive: '1 day ago', status: 'active' },
  { id: 5, name: 'Samuel Osei', email: 's.osei@amezion.gh', role: 'Clergy', lastActive: '2 days ago', status: 'inactive' },
];

const initialRoles = [
  { name: 'Super Admin', users: 2, permissions: 'Full access to all modules' },
  { name: 'Bishop / Episcopacy', users: 1, permissions: 'View all, manage assigned area' },
  { name: 'Head Office Admin', users: 5, permissions: 'Administrative functions' },
  { name: 'Finance Officer', users: 3, permissions: 'Finance module access' },
  { name: 'Conference Admin', users: 5, permissions: 'Conference-level management' },
  { name: 'District Admin', users: 28, permissions: 'District-level management' },
  { name: 'Clergy', users: 1247, permissions: 'View and limited edit' },
];

const Users: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser]);
    toast({
      title: 'User Added',
      description: `${newUser.name} has been added successfully.`,
    });
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleSaveUser = (updatedUser: any) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    toast({
      title: 'User Updated',
      description: `${updatedUser.name} has been updated successfully.`,
    });
  };

  const handleAddRole = (newRole: any) => {
    setRoles([...roles, newRole]);
    toast({
      title: 'Role Added',
      description: `${newRole.name} role has been created successfully.`,
    });
  };

  return (
    <DashboardLayout
      title="Users & Roles"
      subtitle="Manage system users and their access permissions"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: users.length.toLocaleString(), icon: <UsersIcon className="w-5 h-5" /> },
          { label: 'Active Now', value: users.filter(u => u.status === 'active').length.toString(), icon: <UserCog className="w-5 h-5" /> },
          { label: 'Roles', value: roles.length.toString(), icon: <Shield className="w-5 h-5" /> },
          { label: 'Permissions', value: '24', icon: <Key className="w-5 h-5" /> },
        ].map((stat) => (
          <FloatCard key={stat.label} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </FloatCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Users List */}
        <div className="xl:col-span-2">
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
            <FloatInput
              placeholder="Search users..."
              leftIcon={<Search className="w-4 h-4" />}
              className="max-w-sm"
            />
            <FloatButton 
              variant="primary" 
              leftIcon={<Plus className="w-4 h-4" />} 
              className="whitespace-nowrap"
              onClick={() => setIsAddUserOpen(true)}
            >
              Add User
            </FloatButton>
          </div>

          <FloatCard padding="none">
            <div className="overflow-x-auto">
              <table className="float-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Last Active</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <FloatBadge variant={user.role === 'Super Admin' ? 'primary' : 'outline'}>
                          {user.role}
                        </FloatBadge>
                      </td>
                      <td className="text-muted-foreground">{user.lastActive}</td>
                      <td>
                        <FloatBadge variant={user.status === 'active' ? 'success' : 'default'}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </FloatBadge>
                      </td>
                      <td>
                        <FloatButton 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </FloatButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FloatCard>
        </div>

        {/* Roles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground font-display">Roles</h2>
            <FloatButton 
              variant="outline" 
              size="sm" 
              leftIcon={<Plus className="w-4 h-4" />} 
              className="whitespace-nowrap"
              onClick={() => setIsAddRoleOpen(true)}
            >
              Add Role
            </FloatButton>
          </div>

          <div className="space-y-3">
            {roles.map((role) => (
              <FloatCard key={role.name} hover className="cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{role.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{role.permissions}</p>
                  </div>
                  <FloatBadge variant="default">{role.users} users</FloatBadge>
                </div>
              </FloatCard>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onAdd={handleAddUser}
        roles={roles}
      />
      <EditUserModal
        isOpen={isEditUserOpen}
        onClose={() => setIsEditUserOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
        roles={roles}
      />
      <AddRoleModal
        isOpen={isAddRoleOpen}
        onClose={() => setIsAddRoleOpen(false)}
        onAdd={handleAddRole}
      />
    </DashboardLayout>
  );
};

export default Users;
