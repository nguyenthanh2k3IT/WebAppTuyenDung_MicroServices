import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface AdminNavlinkProps {
    to: string;
    label: string;
    icon: LucideIcon;
}

function AdminNavlink({ to, label, icon: Icon }: AdminNavlinkProps) {
    return (
        <Link to={to} className="text-white hover:underline">
            <li className="px-4 my-1 flex items-center leading-10 text-base tracking-wider hover:bg-[#303b61] transition cursor-pointer">
                <Icon className="w-5 h-5 mr-2 text-gray-400" />
                <div>{label}</div>
            </li>
        </Link>
    );
}

export default AdminNavlink;
