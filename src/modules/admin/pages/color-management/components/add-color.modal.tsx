import DrawerContainer from '@/components/container/drawer.container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';
import { ModalType } from '@/enums/modal.enum';
import GeneratorHelper from '@/helpers/generator.helper';
import ValidatorHelper from '@/helpers/validator.helper';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';

const initialState: Color = {
    id: GeneratorHelper.newGuid(),
    name: '',
    description: '',
    slug: '',
};

function AddColorModal() {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateColor];

    const { toast } = useToast();
    const [updateColorInfo, , , handleObjectChange] = useObjectState<Color>(initialState);

    if (!modalState || !modalState.visible) return null;

    const handleAddColor = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(updateColorInfo, ['id']);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const result = await callApi(
            `/catalog-service/api/Color`,
            {
                method: 'POST',
                body: updateColorInfo,
            },
            'User updated successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.CreateColor);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    return (
        <DrawerContainer
            title="Create Color"
            open={modalState.visible}
            onClose={() => closeModal(ModalType.CreateColor)}
        >
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateColorInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Enter slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={updateColorInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Enter name"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={updateColorInfo.description}
                        onChange={handleObjectChange}
                        placeholder="Enter description"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleAddColor}
                    isLoading={loading}
                    loadingText="Creating Color..."
                >
                    Save changes
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
}

export default AddColorModal;
