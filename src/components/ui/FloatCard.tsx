import React from 'react';
import { cn } from '@/lib/utils';

interface FloatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const FloatCard = React.forwardRef<HTMLDivElement, FloatCardProps>(
  ({ className, hover = false, padding = 'md', children, ...props }, ref) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-card rounded-xl border border-border shadow-sm transition-all duration-200',
          hover && 'hover:shadow-md hover:border-primary/20 cursor-pointer',
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FloatCard.displayName = 'FloatCard';

export { FloatCard };
