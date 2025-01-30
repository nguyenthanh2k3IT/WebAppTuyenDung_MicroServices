import React from 'react';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface AppButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    hoverContent?: string;
    disabled?: boolean;
    size?: 'base' | 'sm' | 'xl';
    variant?: 'default' | 'outline';
    shape?: 'default' | 'rounded';
}

function AppButton({
    onClick,
    className,
    children,
    hoverContent,
    disabled = false,
    size = 'base',
    variant = 'default',
    shape = 'default',
}: AppButtonProps) {
    const button = (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                className,
                'transition-colors font-bold border-2 border-app-primary hover:border-app-primary-bold',
                shape === 'default' ? 'rounded-sm' : 'rounded-full',
                size === 'sm' && 'py-1 sm:py-1 px-4 sm:px-4 text-xs sm:text-sm',
                size === 'base' && 'py-2 sm:py-2 px-5 sm:px-7 text-sm sm:text-base',
                size === 'xl' && 'py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base',
                variant === 'default' && 'bg-app-primary hover:bg-app-primary-bold text-white',
                variant === 'outline' && 'bg-transparent text-app-primary hover:bg-app-primary-bold hover:text-white',
            )}
        >
            {children}
        </button>
    );

    return (
        <HoverCard>
            <HoverCardTrigger asChild>{button}</HoverCardTrigger>
            <HoverCardContent className="w-auto font-semibold">{hoverContent || 'Create new'}</HoverCardContent>
        </HoverCard>
    );
}

export default AppButton;
