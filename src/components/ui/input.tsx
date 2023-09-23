import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  iconPosition?: 'start' | 'end';
  iconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon: Icon,
      iconPosition = 'start',
      iconClick,
      ...props
    },
    ref
  ) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            `${Icon && iconPosition === 'start' ? 'ps-11' : 'pr-11'}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <Icon
            size={20}
            onClick={iconClick}
            className={`
              absolute
              text-slate-400
              top-3
              ${iconPosition === 'start' ? 'left-3' : 'right-3'}
              ${iconClick && 'cursor-pointer'}
              `}
          />
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
