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

type DeleteDialogProps = {
    visible: boolean;
    closeModal: () => void;
    onSubmit?: () => void;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({ visible, closeModal, onSubmit }) => {
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
                    <AlertDialogTitle>Confirm delete data</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once confirmed, the data cannot be restored. Confirm?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <Button variant={'destructive'} onClick={handleSubmit}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
