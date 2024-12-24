import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface AddButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    hoverContent?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, className, children, hoverContent }) => {
    const button = (
        <Button
            onClick={onClick}
            className={cn('bg-green-500 hover:bg-green-600 text-white flex items-center', className)}
        >
            <PlusIcon className="w-5 h-5" />
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

export default AddButton;
