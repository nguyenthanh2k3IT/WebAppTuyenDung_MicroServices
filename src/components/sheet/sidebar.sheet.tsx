import { Label } from '../ui/label';
import { Input } from '../ui/input';
import SheetContainer from '../container/sheet.container';
import useSheetContext from '@/hooks/useSheet';
import { SheetType } from '@/enums/sheet.enum';

function SidebarSheet() {
    const { sheets, closeSheet } = useSheetContext();
    const state = sheets[SheetType.HomeSidebar];

    if (!state || !state.visible) return null;

    return (
        <SheetContainer
            open={state.visible}
            onClose={() => closeSheet(SheetType.HomeSidebar)}
            title="Edit profile"
            description="Make changes to your profile here. Click save when you are done."
        >
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
            </div>
        </SheetContainer>
    );
}

export default SidebarSheet;
