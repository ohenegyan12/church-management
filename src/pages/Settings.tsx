import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { Building2, CreditCard, Shield, Lock, Eye, EyeOff, ChevronDown, ChevronUp, Smartphone, Landmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [expandedPayment, setExpandedPayment] = useState<'mobile' | 'bank' | null>(null);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [mobileMoneyForm, setMobileMoneyForm] = useState({
    provider: '',
    accountName: '',
    phoneNumber: '',
  });

  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    branchName: '',
    swiftCode: '',
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Password Updated',
      description: 'Your password has been changed successfully.',
    });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSaveOrganization = () => {
    toast({
      title: 'Settings Saved',
      description: 'Organization details have been updated.',
    });
  };

  const handleSaveMobileMoney = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Mobile Money Saved',
      description: 'Mobile money details have been updated.',
    });
  };

  const handleSaveBankAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Bank Account Saved',
      description: 'Bank account details have been updated.',
    });
  };

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage system configuration and preferences"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="xl:col-span-2 space-y-6">
          {/* Organization Details */}
          <FloatCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground font-display">Organization Details</h2>
                <p className="text-sm text-muted-foreground">Basic information about your church</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatInput label="Organization Name" defaultValue="AME Zion Church Ghana" />
              <FloatInput label="Head Office Address" defaultValue="P.O. Box GP 1234, Accra" />
              <FloatInput label="Phone Number" defaultValue="+233 30 222 3333" />
              <FloatInput label="Email Address" defaultValue="info@amezionghana.org" />
              <FloatInput label="Website" defaultValue="www.amezionghana.org" />
              <FloatInput label="Registration Number" defaultValue="CH-2024-001234" />
            </div>
            
            <div className="flex justify-end mt-6">
              <FloatButton variant="primary" onClick={handleSaveOrganization}>Save Changes</FloatButton>
            </div>
          </FloatCard>

          {/* Payment Configuration */}
          <FloatCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-light text-secondary">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground font-display">Payment Configuration</h2>
                <p className="text-sm text-muted-foreground">Configure payment gateways and settings</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Mobile Money */}
              <div className="rounded-lg border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedPayment(expandedPayment === 'mobile' ? null : 'mobile')}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">Mobile Money</p>
                      <p className="text-sm text-muted-foreground">MTN, Vodafone, AirtelTigo</p>
                    </div>
                  </div>
                  {expandedPayment === 'mobile' ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                
                {expandedPayment === 'mobile' && (
                  <form onSubmit={handleSaveMobileMoney} className="p-4 pt-0 space-y-4 border-t border-border">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Provider</label>
                      <select
                        value={mobileMoneyForm.provider}
                        onChange={(e) => setMobileMoneyForm({ ...mobileMoneyForm, provider: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select provider</option>
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="vodafone">Vodafone Cash</option>
                        <option value="airteltigo">AirtelTigo Money</option>
                      </select>
                    </div>
                    <FloatInput
                      label="Account Name"
                      value={mobileMoneyForm.accountName}
                      onChange={(e) => setMobileMoneyForm({ ...mobileMoneyForm, accountName: e.target.value })}
                      placeholder="Enter account name"
                    />
                    <FloatInput
                      label="Phone Number"
                      value={mobileMoneyForm.phoneNumber}
                      onChange={(e) => setMobileMoneyForm({ ...mobileMoneyForm, phoneNumber: e.target.value })}
                      placeholder="Enter phone number"
                    />
                    <FloatButton type="submit" variant="primary" className="w-full">
                      Save Mobile Money Details
                    </FloatButton>
                  </form>
                )}
              </div>
              
              {/* Bank Account */}
              <div className="rounded-lg border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedPayment(expandedPayment === 'bank' ? null : 'bank')}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">Bank Account</p>
                      <p className="text-sm text-muted-foreground">Direct bank deposits</p>
                    </div>
                  </div>
                  {expandedPayment === 'bank' ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                
                {expandedPayment === 'bank' && (
                  <form onSubmit={handleSaveBankAccount} className="p-4 pt-0 space-y-4 border-t border-border">
                    <FloatInput
                      label="Bank Name"
                      value={bankForm.bankName}
                      onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                      placeholder="Enter bank name"
                    />
                    <FloatInput
                      label="Account Name"
                      value={bankForm.accountName}
                      onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                      placeholder="Enter account name"
                    />
                    <FloatInput
                      label="Account Number"
                      value={bankForm.accountNumber}
                      onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                      placeholder="Enter account number"
                    />
                    <FloatInput
                      label="Branch Name"
                      value={bankForm.branchName}
                      onChange={(e) => setBankForm({ ...bankForm, branchName: e.target.value })}
                      placeholder="Enter branch name"
                    />
                    <FloatInput
                      label="SWIFT Code (Optional)"
                      value={bankForm.swiftCode}
                      onChange={(e) => setBankForm({ ...bankForm, swiftCode: e.target.value })}
                      placeholder="Enter SWIFT code"
                    />
                    <FloatButton type="submit" variant="primary" className="w-full">
                      Save Bank Account Details
                    </FloatButton>
                  </form>
                )}
              </div>
            </div>
          </FloatCard>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Security Settings */}
          <FloatCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-display">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Update your password</p>
              </div>
            </div>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <FloatButton type="submit" variant="primary" className="w-full">
                Update Password
              </FloatButton>
            </form>
          </FloatCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
