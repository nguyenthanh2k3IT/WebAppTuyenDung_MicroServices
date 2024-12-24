// src/components/MenuDropdown.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

const MenuDropdown: React.FC<MenuDropdownProps> = ({
    triggerContent = 'Open',
    menuItems = [],
    width = 'w-56',
    case: caseFilter = '',
}) => {
    const handleItemClick = (item: MenuDropdownItem) => {
        if (item.callback) {
            item.callback();
        }
        if (item.navigate) {
            window.location.href = item.navigate;
        }
    };

    const renderMenuItems = (items: MenuDropdownItem[]) => {
        return items
            .filter((item) => !item.filter || item.filter.includes(caseFilter))
            .map((item, index) =>
                item.label === 'separator' ? (
                    <DropdownMenuSeparator key={index} />
                ) : item.submenu ? (
                    <DropdownMenuSub key={index}>
                        <DropdownMenuSubTrigger className="flex items-center cursor-pointer ">
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.label}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>{renderMenuItems(item.submenu)}</DropdownMenuSubContent>
                    </DropdownMenuSub>
                ) : (
                    <DropdownMenuItem
                        key={index}
                        disabled={item.disabled}
                        onClick={() => handleItemClick(item)}
                        className="flex items-center cursor-pointer"
                    >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.label}
                    </DropdownMenuItem>
                ),
            );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{triggerContent}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={width}>{renderMenuItems(menuItems)}</DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MenuDropdown;
