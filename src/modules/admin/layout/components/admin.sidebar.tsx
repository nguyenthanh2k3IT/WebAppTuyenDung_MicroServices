import {
    Layers,
    Tag,
    Users,
    Package,
    Percent,
    Palette,
    FileText,
    Briefcase,
    Network,
    MapPin,
    Building,
    Home,
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SheetContainer from '@/components/container/sheet.container';
import useSheetContext from '@/hooks/useSheet';
import { SheetType } from '@/enums/sheet.enum';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AdminNavlink from './admin.navlink';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const accordionItems = [
    {
        id: 'item-1',
        title: 'Quản lý người dùng',
        icon: Users,
        links: [
            { to: '/admin/user', label: 'Tài khoản', icon: Users },
            { to: '/admin/company', label: 'Doanh nghiệp', icon: Building },
            { to: '/admin/size', label: 'Quy mô', icon: Network },
            { to: '/admin/province', label: 'Tỉnh thành', icon: MapPin },
        ],
    },
    {
        id: 'item-2',
        title: 'Quản lý bài viết',
        icon: FileText,
        links: [
            { to: '/admin/post', label: 'Bài viết', icon: FileText },
            { to: '/admin/category', label: 'Thể loại', icon: Tag },
            { to: '/admin/tagname', label: 'Thẻ', icon: Percent },
        ],
    },
    {
        id: 'item-3',
        title: 'Quản lý công việc',
        icon: Briefcase,
        links: [
            { to: '/admin/job', label: 'Công việc', icon: Briefcase },
            { to: '/admin/worktype', label: 'Hình thức làm việc', icon: Layers },
            { to: '/admin/experience', label: 'Kinh nghiệm', icon: Palette },
            { to: '/admin/job-category', label: 'Lĩnh vực', icon: Percent },
            { to: '/admin/rank', label: 'Cấp bậc', icon: Package },
            { to: '/admin/gender', label: 'Giới tính', icon: Users },
        ],
    },
];

function AdminSidebar() {
    const { sheets, closeSheet } = useSheetContext();
    const state = sheets[SheetType.AdminSidebar];
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const SidebarContent = () => {
        return (
            <>
                <div className="p-4">
                    <h1 className="text-2xl font-bold">JOB ALLEY</h1>
                </div>
                <nav className="mt-8">
                    <ScrollArea className="w-full h-[85vh]">
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value={'dashboard'} className="border-b-0 mb-2">
                                <Link to="/admin/dashboard">
                                    <AccordionTrigger className="px-2 bg-[#303b61] flex items-center space-x-2 tracking-wider no-rotate">
                                        <Home className="w-5 h-5" />
                                        <span>{'Trang chủ'}</span>
                                    </AccordionTrigger>
                                </Link>
                            </AccordionItem>
                            {accordionItems.map((item) => (
                                <AccordionItem key={item.id} value={item.id} className="border-b-0 mb-2">
                                    <AccordionTrigger className="px-2 bg-[#303b61] flex items-center space-x-2 tracking-wider no-rotate">
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.title}</span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul>
                                            {item.links.map((link, index) => (
                                                <AdminNavlink
                                                    key={index}
                                                    to={link.to}
                                                    label={link.label}
                                                    icon={link.icon}
                                                />
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </ScrollArea>
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
