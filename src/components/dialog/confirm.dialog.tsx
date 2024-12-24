import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

type ConfirmDialogProps = {
    visible: boolean;
    closeModal: () => void;
    onSubmit?: () => void;
    title?: string;
    description?: string;
    variant?: 'outline' | 'destructive' | 'default';
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    visible,
    closeModal,
    onSubmit,
    title = 'Confirm dialog',
    description = 'Are you sure you want to perform this action?',
    variant = 'outline',
}) => {
    const [state, setState] = useState({
        title,
        description,
    });

    useEffect(() => {
        setState({ title, description });
    }, [title, description]);

    const handleChange = (isOpen: boolean) => {
        if (!isOpen) closeModal();
    };

    const handleSubmit = () => {
        if (onSubmit) onSubmit();
        closeModal();
    };

    return (
        <AlertDialog open={visible} onOpenChange={handleChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{state.title}</AlertDialogTitle>
                    <AlertDialogDescription>{state.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <Button variant={variant} onClick={handleSubmit}>
                        Confirm
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDialog;
