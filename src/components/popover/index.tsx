import { Popover as PopoverContainer, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import React from 'react';
import { cn } from '@/lib/utils';

type PopoverProps = {
    content: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    type?: 'click' | 'hover';
};

export default function Popover({ content, children, className = 'w-80', type = 'click' }: PopoverProps) {
    if (type === 'hover') {
        return (
            <HoverCard>
                <HoverCardTrigger asChild>{children}</HoverCardTrigger>
                <HoverCardContent className={cn(className)}>{content}</HoverCardContent>
            </HoverCard>
        );
    }

    return (
        <PopoverContainer>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className={cn(className)}>{content}</PopoverContent>
        </PopoverContainer>
    );
}
