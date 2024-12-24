import DrawerContainer from '@/components/container/drawer.container';
import LoadingButton from '@/components/ui/loading-button';
import ImageUpload from '@/components/upload/image-upload';
import { ModalType } from '@/enums/modal.enum';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import Empty from '@/assets/images/empty.jpg';
import { Trash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { uploadMultiImage } from '@/services/storage.service';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

function ProductImageModal() {
    const [initLoading, setInitLoading] = useState<boolean>(true);
    const { loading, setLoading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const [files, setFiles] = useState<File[]>([]);
    const modalState = modals[ModalType.ProductImage];
    const [images, setImages] = useState<ProductImage[]>(modalState.data?.images ?? []);
    const [deleteIds, setDeleteIds] = useState<string[]>([]);

    useEffect(() => {
        if (modalState && modalState.visible && modalState.data) {
            setImages(modalState.data.images || []);
            setTimeout(() => {
                setInitLoading(false);
            }, 1500);
            // setInitLoading(false);
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    const LoadingComponent = () => (
        <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="h-40 w-full">
                    <Skeleton className="w-full h-full rounded-md" />
                </div>
            ))}
        </div>
    );

    const handleDelete = async (): Promise<boolean> => {
        const result = await callApi(
            `/catalog-service/api/ProductItem/images`,
            {
                method: 'DELETE',
                body: { ids: deleteIds },
            },
            'Image deleted successfully',
        );
        return result.succeeded;
    };

    const handleUpload = async (): Promise<boolean> => {
        setLoading(true);
        const urls = await uploadMultiImage(files);
        const result = await callApi(
            `/catalog-service/api/ProductItem/images`,
            {
                method: 'POST',
                body: {
                    productItemId: modalState.data.id,
                    urls,
                },
            },
            'Image upload successfully',
        );
        return result.succeeded;
    };

    const handleSaveChange = async () => {
        let result = true;
        if (deleteIds.length > 0) {
            result = await handleDelete();
        }
        if (files.length > 0) {
            result = await handleUpload();
        }

        if (!result) return;

        onCloseModal();
        modalState.callback?.();
    };

    const onCloseModal = () => {
        closeModal(ModalType.ProductImage);
        setDeleteIds([]);
        setFiles([]);
        setLoading(false);
        setInitLoading(true);
    };

    return (
        <div>
            <DrawerContainer title="Product item's images" open={modalState.visible} onClose={onCloseModal}>
                <div className="grid items-start gap-4 px-2 md:w-[800px] sm:w-full">
                    <div className="grid gap-2">
                        <ImageUpload maxFiles={8} size="full" onChangeFiles={setFiles} />
                    </div>
                    <div className="grid gap-2">
                        {initLoading || images.length === 0 ? (
                            initLoading ? (
                                LoadingComponent()
                            ) : (
                                <img src={Empty} alt="empty" className="mx-auto" />
                            )
                        ) : (
                            <Carousel
                                opts={{
                                    align: 'start',
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {images.map((item, index) => {
                                        const isChecked = deleteIds.includes(item.id);
                                        return (
                                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                                <div className="p-1">
                                                    <div
                                                        key={item.id}
                                                        className="border-transparent border hover:border-black h-full transition p-2 cursor-pointer relative"
                                                    >
                                                        <img src={item.url} alt="img" className="" />
                                                        <div
                                                            onClick={() =>
                                                                setDeleteIds((prev) =>
                                                                    isChecked
                                                                        ? prev.filter((id) => id !== item.id)
                                                                        : [...prev, item.id],
                                                                )
                                                            }
                                                            className={`hover:opacity-80 transition absolute top-2 right-2 w-6 h-6 border-2 border-red-500 bg-white rounded-md flex items-center justify-center cursor-pointer ${
                                                                isChecked ? '!bg-red-500 border-red-500' : ''
                                                            }`}
                                                        >
                                                            <Trash
                                                                className={isChecked ? 'text-white' : 'text-red-500'}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        );
                                    })}
                                </CarouselContent>
                            </Carousel>
                        )}
                    </div>
                    <LoadingButton
                        className="mt-2"
                        onClick={handleSaveChange}
                        isLoading={loading}
                        loadingText="Saving changes ..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </DrawerContainer>
        </div>
    );
}

export default ProductImageModal;
