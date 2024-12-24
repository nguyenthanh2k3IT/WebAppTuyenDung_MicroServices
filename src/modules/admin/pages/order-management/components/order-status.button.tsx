import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { OrderStatusEnum } from '@/enums/order-status.enum';
import { cn } from '@/lib/utils';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { memo } from 'react';
import { orderColors } from '../constants/order.color';
import { orderHover } from '../constants/order.hover';

interface OrderStatusButtonProps {
    className?: string;
    status?: OrderStatus | null;
    onClick?: () => void;
}

const valid: string[] = [OrderStatusEnum.Placed, OrderStatusEnum.Packed, OrderStatusEnum.Shipping];

function OrderStatusButton({ className, status, onClick }: OrderStatusButtonProps) {
    if (!status || !valid.includes(status.id)) {
        return null;
    }

    const statusClass = orderColors[status.id] || 'bg-gray-200 hover:bg-gray-300';

    const button = (
        <Button onClick={onClick} className={cn('text-white flex items-center', statusClass, className)}>
            <Pencil2Icon className="w-5 h-5 mr-1" />
        </Button>
    );

    return (
        <HoverCard>
            <HoverCardTrigger asChild>{button}</HoverCardTrigger>
            <HoverCardContent className="w-auto font-semibold">{orderHover[status.id]}</HoverCardContent>
        </HoverCard>
    );
}

export default memo(OrderStatusButton);
