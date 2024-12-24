import { Bell, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingPopover from './setting.popover';
import NotificationPopover from './notification.popover';
import Image from '@/components/image';
import useSheetContext from '@/hooks/useSheet';
import { SheetType } from '@/enums/sheet.enum';

function AdminNavbar() {
    const { openSheet } = useSheetContext();

    const handleOpenSidebar = () => {
        openSheet(SheetType.AdminSidebar);
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="px-4 py-2 mx-auto">
                <div className="flex items-center justify-between">
                    <div className="pl-2">
                        <Button variant="ghost" size="icon" onClick={handleOpenSidebar} className="block md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <NotificationPopover>
                            <Button variant="ghost" size="icon">
                                <Bell className="w-5 h-5 text-gray-500" />
                            </Button>
                        </NotificationPopover>
                        <SettingPopover>
                            <Button variant="ghost" size="icon">
                                <Settings className="w-5 h-5 text-gray-500" />
                            </Button>
                        </SettingPopover>
                        <Image shape="circle" src="https://github.com/shadcn.png" alt="@shadcn" className="w-10 h-10" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
