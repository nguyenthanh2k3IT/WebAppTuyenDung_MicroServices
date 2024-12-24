import { Home, ShoppingCart, Layers, Tag, Users, Package, Percent, Palette } from 'lucide-react';
import { AdminNavigate } from '../../navigate';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SheetContainer from '@/components/container/sheet.container';
import useSheetContext from '@/hooks/useSheet';
import { SheetType } from '@/enums/sheet.enum';

const iconMap = {
    dashboard: Home,
    order: ShoppingCart,
    category: Layers,
    product: Package,
    discount: Percent,
    user: Users,
    brand: Tag,
    size: Tag,
    color: Palette,
};

function AdminSidebar() {
    const { sheets, closeSheet } = useSheetContext();
    const state = sheets[SheetType.AdminSidebar];
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = Object.entries(AdminNavigate)
        .filter(([_, value]) => value.sidebar === true)
        .map(([key, value]) => ({
            icon: iconMap[key as keyof typeof iconMap] || Home,
            label: value.title,
            to: value.link,
        }));

    const handleNavigate = (to: string) => {
        navigate(to);
        if (!isDesktop) closeSheet(SheetType.AdminSidebar);
    };

    const SidebarContent = () => {
        return (
            <>
                <div className="p-4">
                    <h1 className="text-2xl font-bold">ASOS ADMIN</h1>
                </div>
                <nav className="mt-8">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li
                                onClick={() => handleNavigate(item.to)}
                                key={index}
                                className={`px-4 py-2 cursor-pointer ${
                                    location.pathname === item.to
                                        ? 'bg-[#2E3A5C] text-white'
                                        : 'hover:bg-[#2E3A5C] text-gray-300 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </>
        );
    };

    if (!isDesktop) {
        if (!state || !state.visible) return null;

        return (
            <SheetContainer
                open={state.visible}
                onClose={() => closeSheet(SheetType.AdminSidebar)}
                className="bg-[#1E2640]"
                side="left"
            >
                <div className="bg-[#1E2640] text-white">{SidebarContent()}</div>
            </SheetContainer>
        );
    }

    return <aside className="w-64 bg-[#1E2640] text-white hidden md:block">{SidebarContent()}</aside>;
}

export default AdminSidebar;
