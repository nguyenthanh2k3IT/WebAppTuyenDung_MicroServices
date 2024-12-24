import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
    width?: string;
    height?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SearchInput({ width = 'w-full', height = 'h-full', value, onChange, onKeyDown }: SearchInputProps) {
    return (
        <div className={cn('flex items-center bg-white rounded-full px-4', width, height)}>
            <input
                type="text"
                placeholder="Search for items and brands"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="bg-transparent w-full outline-none text-black tracking-wider"
            />
            <Search className="text-gray-400 cursor-pointer hover:text-black transition" />
        </div>
    );
}

export default SearchInput;
