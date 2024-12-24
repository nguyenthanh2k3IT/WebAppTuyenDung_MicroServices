import { useEffect, useState } from 'react';
import DrawerContainer from '@/components/container/drawer.container';
import { Button } from '@/components/ui/button';
import { ModalType } from '@/enums/modal.enum';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import { Star } from 'lucide-react';

function RatingModal() {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.AddRating];
    const [rating, setRating] = useState(5);

    useEffect(() => {
        if (modalState && modalState.data && modalState.data.rated) {
            if (rating !== modalState.data.rated) setRating(modalState.data.rated);
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    const handleStarClick = (index: number) => {
        setRating(index + 1);
    };

    const handleClose = () => {
        setRating(5);
        closeModal(ModalType.AddRating);
    };

    const handleRate = async () => {
        const result = await callApi(
            `/catalog-service/api/Rating`,
            {
                method: 'POST',
                body: {
                    ProductId: modalState.data.id,
                    Rate: rating,
                },
            },
            'Product rated successfully',
        );
        if (result.succeeded) {
            handleClose();
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    return (
        <DrawerContainer title="Rate Product" open={modalState.visible} onClose={handleClose}>
            <div className="md:w-[300px] sm:w-full">
                <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`cursor-pointer h-7 w-7 ${i < rating ? 'text-yellow-500' : 'text-gray-500'}`}
                            fill={i < rating ? 'currentColor' : 'none'}
                            onClick={() => handleStarClick(i)} // Xử lý click
                        />
                    ))}
                </div>
                <Button className="mt-4 w-full" onClick={handleRate} disabled={loading}>
                    Save changes
                </Button>
            </div>
        </DrawerContainer>
    );
}

export default RatingModal;
