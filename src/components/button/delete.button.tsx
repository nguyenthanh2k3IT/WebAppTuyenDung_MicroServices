import React from 'react';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface DeleteButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    hoverContent?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, className, children, hoverContent }) => {
    const button = (
        <Button onClick={onClick} className={cn('bg-red-400 hover:bg-red-500 text-white flex items-center', className)}>
            <TrashIcon className="w-5 h-5" />
            {children}
        </Button>
    );

    return (
        <HoverCard>
            <HoverCardTrigger asChild>{button}</HoverCardTrigger>
            <HoverCardContent className="w-auto font-semibold">{hoverContent || 'Delete'}</HoverCardContent>
        </HoverCard>
    );
};

export default DeleteButton;
