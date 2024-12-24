import React from 'react';
import { cn } from '@/lib/utils';

type FlexProps = {
    children: React.ReactNode;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    wrap?: boolean;
    align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between' | 'space-evenly';
    items?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
    className?: string;
};

const Flex: React.FC<FlexProps> = ({
    children,
    direction = 'row',
    wrap = false,
    align = 'stretch',
    justify = 'flex-start',
    items = 'stretch',
    className = '',
}) => {
    return (
        <div
            className={cn(
                'flex',
                direction === 'row' ? 'flex-row' : direction === 'column' ? 'flex-col' : `flex-${direction}`,
                wrap ? 'flex-wrap' : 'flex-nowrap',
                `justify-${justify}`,
                `items-${items}`,
                `content-${align}`,
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Flex;
