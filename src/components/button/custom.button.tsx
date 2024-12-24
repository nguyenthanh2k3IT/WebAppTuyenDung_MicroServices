import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface CustomButtonProps {
    onClick?: () => void;
    variant?: Varinant;
    className?: string;
    children?: React.ReactNode;
    hoverContent?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, className, variant, children, hoverContent }) => {
    const button = (
        <Button variant={variant || 'default'} onClick={onClick} className={cn(' flex items-center', className)}>
            {children}
        </Button>
    );

    return (
        <HoverCard>
            <HoverCardTrigger asChild>{button}</HoverCardTrigger>
            <HoverCardContent className="w-auto font-semibold">{hoverContent || 'Create new'}</HoverCardContent>
        </HoverCard>
    );
};

export default CustomButton;
