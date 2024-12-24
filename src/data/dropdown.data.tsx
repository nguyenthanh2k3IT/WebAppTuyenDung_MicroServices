import { User, CreditCard, Settings, Keyboard, HelpCircle, LogOut, PlusCircle } from 'lucide-react';

export const menuItems: MenuDropdownItem[] = [
    { label: 'Profile', icon: <User size={16} />, navigate: '/profile', filter: ['admin', 'manager'] },
    { label: 'Billing', icon: <CreditCard size={16} />, navigate: '/billing', filter: ['admin'] },
    { label: 'Settings', icon: <Settings size={16} />, callback: () => alert('Settings clicked'), filter: ['admin'] },
    { label: 'Keyboard shortcuts', icon: <Keyboard size={16} /> },
    { label: 'separator' },
    {
        label: 'Team',
        icon: <PlusCircle size={16} />,
        submenu: [
            {
                label: 'Invite users',
                icon: <User size={16} />,
                callback: () => alert('Invite users clicked'),
                filter: ['admin'],
            },
            { label: 'Email', icon: <Keyboard size={16} />, navigate: '/email', filter: ['manager'] },
            { label: 'Message', icon: <CreditCard size={16} />, callback: () => alert('Message clicked') },
            { label: 'More...', icon: <Settings size={16} />, navigate: '/more', filter: ['admin'] },
        ],
    },
    { label: 'separator' },
    { label: 'GitHub', icon: <CreditCard size={16} />, navigate: 'https://github.com', filter: ['admin'] },
    { label: 'Support', icon: <HelpCircle size={16} />, callback: () => console.log('Support clicked') },
    { label: 'API', disabled: true },
    { label: 'Log out', icon: <LogOut size={16} />, callback: () => console.log('Log out clicked') },
];
