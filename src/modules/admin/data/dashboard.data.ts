interface Project {
    icon: string;
    color: string;
    title: string;
    team: string;
    timeLeft: string;
    progress: number;
    members: string[];
}

const img = 'https://github.com/shadcn.png';

export const projects: Project[] = [
    {
        icon: '📱',
        color: 'bg-pink-500',
        title: 'App Development',
        team: 'Marketing Team',
        timeLeft: '1 Week Left',
        progress: 34,
        members: [img, img, img],
    },
    {
        icon: '🖥️',
        color: 'bg-green-500',
        title: 'Web Design',
        team: 'Core UI Team',
        timeLeft: '2 Weeks Left',
        progress: 76,
        members: [img],
    },
    {
        icon: '🛬',
        color: 'bg-blue-500',
        title: 'Landing Page',
        team: 'Marketing Team',
        timeLeft: '2 Days Left',
        progress: 4,
        members: [img, img, img],
    },
    {
        icon: '📊',
        color: 'bg-orange-500',
        title: 'Business Compare',
        team: 'Marketing Team',
        timeLeft: '1 Month Left',
        progress: 90,
        members: [img, img],
    },
    {
        icon: '🛒',
        color: 'bg-purple-500',
        title: 'E-commerce Checkout',
        team: 'Order Process Team',
        timeLeft: '3 Weeks Left',
        progress: 65,
        members: [img],
    },
    {
        icon: '📊',
        color: 'bg-yellow-500',
        title: 'Data Staging',
        team: 'Core Data Team',
        timeLeft: '2 Months Left',
        progress: 96,
        members: [img, img],
    },
    {
        icon: '📣',
        color: 'bg-indigo-500',
        title: 'Campaign Store',
        team: 'Internal Communication',
        timeLeft: '11 Days Left',
        progress: 24,
        members: [img, img, img],
    },
    {
        icon: '🤝',
        color: 'bg-red-500',
        title: 'Acquisition Mitra',
        team: 'Merchant Team',
        timeLeft: '1 Week Left',
        progress: 70,
        members: [img],
    },
];
