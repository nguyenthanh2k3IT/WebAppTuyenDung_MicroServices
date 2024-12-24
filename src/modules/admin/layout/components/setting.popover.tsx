import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Lock, LogOut } from 'lucide-react';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import useCaller from '@/hooks/useCaller';
import { removeTokens } from '@/helpers/storage.helper';
import { AdminNavigate } from '../../navigate';

interface SettingPopoverProps {
    children: ReactNode;
}

export default function SettingPopover({ children }: SettingPopoverProps) {
    const { callApi } = useCaller<boolean>();
    const { openModal } = useModalContext();

    const handleLogout = async () => {
        const result = await callApi(
            '/identity-service/api/Auth/logout',
            {
                method: 'POST',
            },
            'Logout Successfully',
        );

        if (result.data && result.data === true) {
            setTimeout(() => {
                removeTokens();
                window.location.href = AdminNavigate.login.link;
            }, 1500);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-48">
                <div className="flex flex-col space-y-2">
                    <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => openModal(ModalType.UpdatePassword)}
                    >
                        <Lock className="w-4 h-4 mr-2" />
                        Password
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
