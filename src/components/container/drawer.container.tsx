import * as React from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';

type DrawerContainerProps = {
    children: React.ReactNode;
    title: string;
    description?: string;
    open: boolean;
    onClose: () => void;
};

const DrawerContainer: React.FC<DrawerContainerProps> = ({ children, title, description, open, onClose }) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const handleChange = (isOpen: boolean) => {
        if (!isOpen) onClose();
    };

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={handleChange}>
                <DialogContent className="w-auto max-w-full">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={handleChange}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                {children}
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Hủy</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerContainer;
