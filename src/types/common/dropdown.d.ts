interface MenuDropdownItem {
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
    navigate?: string;
    callback?: () => void;
    submenu?: MenuDropdownItem[];
    filter?: string[];
}

interface MenuDropdownProps {
    triggerContent?: string;
    menuItems?: MenuDropdownItem[];
    width?: string;
    case?: string;
}
