import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - replace with actual auth
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo-new.avif" alt="AME Zion logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-xl font-bold font-display">Church Management</h1>
              <p className="text-sm opacity-80">Ghana Conference</p>
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-lg">
            <h2 className="text-4xl xl:text-5xl font-bold font-display leading-tight">
              Church Management System
            </h2>
            <p className="mt-6 text-lg opacity-90 leading-relaxed">
              Empowering the Church Management in Ghana with modern tools
              for administration, finance, and community engagement.
            </p>

            {/* Features */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { label: 'Members', value: '50,000+' },
                { label: 'Congregations', value: '500+' },
                { label: 'Districts', value: '25+' },
                { label: 'Conferences', value: '5' },
              ].map((stat) => (
                <div key={stat.label} className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-3xl font-bold font-display">{stat.value}</p>
                  <p className="text-sm opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm opacity-60">
            © 2024 Church Management - Ghana
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <img src="/logo-new.avif" alt="AME Zion logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">Church Management</h1>
              <p className="text-sm text-muted-foreground">Ghana Conference</p>
            </div>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-bold text-foreground font-display">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <FloatInput
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-5 h-5" />}
              required
            />

            <div className="relative">
              <FloatInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <FloatButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Sign in
            </FloatButton>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Need help? Contact{' '}
              <a href="mailto:support@amezionghana.org" className="font-medium text-primary hover:underline">
                support@amezionghana.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
