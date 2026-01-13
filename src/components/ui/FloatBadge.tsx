import React from 'react';
import { cn } from '@/lib/utils';

interface FloatBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'outline';
}

const FloatBadge = React.forwardRef<HTMLSpanElement, FloatBadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-muted text-muted-foreground',
      primary: 'bg-primary-light text-primary',
      success: 'bg-success-light text-success',
      warning: 'bg-warning-light text-warning',
      destructive: 'bg-destructive-light text-destructive',
      outline: 'bg-transparent border border-border text-foreground',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

FloatBadge.displayName = 'FloatBadge';

export { FloatBadge };
