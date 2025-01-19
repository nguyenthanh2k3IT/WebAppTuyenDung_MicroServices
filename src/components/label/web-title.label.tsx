import { cn } from '@/lib/utils';

function WebTitle({ className = '' }) {
    return (
        <h2 className={cn('text-2xl font-bold', className)}>
            Job<span className="text-[#1DA1F2]">Alley</span>
        </h2>
    );
}

export default WebTitle;
