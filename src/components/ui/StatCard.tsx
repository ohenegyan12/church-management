import React from 'react';
import { cn } from '@/lib/utils';
import { FloatCard } from './FloatCard';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
  textOnDark?: boolean;
  style?: React.CSSProperties;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className,
  textOnDark = false,
  style,
}) => {
  const changeColors = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground',
  };
  const titleColor = textOnDark ? 'text-white/80' : 'text-muted-foreground';
  const valueColor = textOnDark ? 'text-white' : 'text-foreground';
  const changeColor = textOnDark ? 'text-white/90' : changeColors[changeType];

  return (
    <FloatCard className={cn('animate-slide-in-up', className)} style={style}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn('text-sm font-medium', titleColor)}>{title}</p>
          <p className={cn('mt-2 text-3xl font-bold tracking-tight font-display', valueColor)}>
            {value}
          </p>
          {change && (
            <p className={cn('mt-2 text-sm font-medium', changeColor)}>
              {changeType === 'positive' && '↑ '}
              {changeType === 'negative' && '↓ '}
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary">
            {icon}
          </div>
        )}
      </div>
    </FloatCard>
  );
};

export { StatCard };
