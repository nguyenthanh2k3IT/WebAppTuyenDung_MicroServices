import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Notification {
    id: string;
    title: string;
    content: string;
    time: string;
}

interface NotificationPopoverProps {
    children: React.ReactNode;
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: '1', title: 'New Order', content: 'You have a new order #1234', time: '5 minutes ago' },
        { id: '2', title: 'Payment Received', content: 'Payment for order #5678 received', time: '10 minutes ago' },
        { id: '3', title: 'New User', content: 'New user registered: John Doe', time: '15 minutes ago' },
        { id: '4', title: 'Stock Alert', content: 'Product XYZ is low in stock', time: '20 minutes ago' },
        { id: '5', title: 'Review Posted', content: 'New review for product ABC', time: '25 minutes ago' },
    ]);

    const [displayCount, setDisplayCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = () => {
        setIsLoading(true);
        // Simulating an API call
        setTimeout(() => {
            const newNotifications: Notification[] = [
                {
                    id: '6',
                    title: 'New Message',
                    content: 'You have a new message from support',
                    time: '30 minutes ago',
                },
                {
                    id: '7',
                    title: 'Promotion Started',
                    content: 'Summer sale promotion has started',
                    time: '35 minutes ago',
                },
                {
                    id: '8',
                    title: 'Refund Request',
                    content: 'New refund request for order #9012',
                    time: '40 minutes ago',
                },
                {
                    id: '9',
                    title: 'Server Update',
                    content: 'Server maintenance scheduled for tonight',
                    time: '45 minutes ago',
                },
                { id: '10', title: 'New Feature', content: 'New feature released: Dark Mode', time: '50 minutes ago' },
            ];
            setNotifications([...notifications, ...newNotifications]);
            setDisplayCount(displayCount + 5);
            setIsLoading(false);
        }, 1000); // Simulate a 1-second delay
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-80 p-0 mt-1">
                <ScrollArea className="h-[300px]">
                    {notifications.slice(0, displayCount).map((notification, index) => (
                        <React.Fragment key={notification.id}>
                            {index > 0 && index % 5 === 0 && <Separator className="my-2" />}
                            <div className="p-4 border-b last:border-b-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{notification.title}</h3>
                                        <p className="text-sm text-gray-500">{notification.content}</p>
                                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteNotification(notification.id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </ScrollArea>
                <div className="p-2 text-center border-t">
                    <Button variant="ghost" onClick={loadMore} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Show More'
                        )}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationPopover;
