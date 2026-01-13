import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { Church, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call - replace with actual password reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: 'Email Sent',
        description: 'Check your inbox for password reset instructions.',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <Church className="w-7 h-7 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display">AME Zion Church</h1>
              <p className="text-sm opacity-80">Ghana Conference</p>
            </div>
          </div>

          <div className="max-w-lg">
            <h2 className="text-4xl xl:text-5xl font-bold font-display leading-tight">
              Reset Your Password
            </h2>
            <p className="mt-6 text-lg opacity-90 leading-relaxed">
              Don't worry, it happens to the best of us. Enter your email and we'll send you 
              instructions to reset your password.
            </p>
          </div>

          <p className="text-sm opacity-60">
            © 2024 African Methodist Episcopal Zion Church - Ghana
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Church className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">AME Zion</h1>
              <p className="text-sm text-muted-foreground">Ghana Conference</p>
            </div>
          </div>

          {!isSubmitted ? (
            <>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-2xl font-bold text-foreground font-display">Forgot password?</h2>
                <p className="mt-2 text-muted-foreground">Enter your email to receive reset instructions</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FloatInput
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-5 h-5" />}
                  required
                />

                <FloatButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Send Reset Link
                </FloatButton>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground font-display">Check your email</h2>
              <p className="mt-2 text-muted-foreground">
                We've sent password reset instructions to <br />
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-primary hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border">
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;