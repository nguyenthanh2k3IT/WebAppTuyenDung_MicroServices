import React from 'react';
import { Button } from '@/components/ui/button';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface DetailButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    hoverContent?: string;
}

const DetailButton: React.FC<DetailButtonProps> = ({ onClick, className, children, hoverContent }) => {
    const button = (
        <Button
            onClick={onClick}
            className={cn('bg-gray-400 hover:opacity-80 text-white flex items-center', className)}
        >
            <InfoCircledIcon className="w-5 h-5" />
            {children}
        </Button>
    );

    return (
        <HoverCard>
            <HoverCardTrigger asChild>{button}</HoverCardTrigger>
            <HoverCardContent className="w-auto font-semibold">{hoverContent || 'Information'}</HoverCardContent>
        </HoverCard>
    );
};

export default DetailButton;
