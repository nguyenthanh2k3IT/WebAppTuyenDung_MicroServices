import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const SearchBar = () => {
    return (
        <div className="relative -mt-8 sm:-mt-11 content-padding">
            <div className="bg-app-primary rounded-2xl sm:rounded-full p-4 sm:py-6 sm:px-8">
                <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center">
                    {/* Professional Input */}
                    <div className="w-full md:w-1/3">
                        <Input
                            type="text"
                            placeholder="All Professionals"
                            className="h-10 sm:h-12 rounded-xl sm:rounded-full border-0 bg-white/90 
                            focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base
                            placeholder:text-gray-400 shadow-sm"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="w-full md:w-1/3">
                        <Input
                            type="text"
                            placeholder="Any Location"
                            className="h-10 sm:h-12 rounded-xl sm:rounded-full border-0 bg-white/90 
                            focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base
                            placeholder:text-gray-400 shadow-sm"
                        />
                    </div>

                    {/* Service Select */}
                    <div className="w-full md:w-1/3">
                        <Select>
                            <SelectTrigger
                                className="h-10 sm:h-12 rounded-xl sm:rounded-full border-0 bg-white/90 
                                focus:ring-0 text-sm sm:text-base shadow-sm"
                            >
                                <SelectValue placeholder="ALL Service" />
                            </SelectTrigger>
                            <SelectContent className="text-sm sm:text-base">
                                <SelectItem value="all">ALL Service</SelectItem>
                                <SelectItem value="it">IT & Programming</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="writing">Writing</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search Button */}
                    <div className="w-full md:w-auto">
                        <Button
                            className="w-full md:w-12 h-10 sm:h-12 rounded-xl sm:rounded-full bg-[#1F1F1F]/90 
                            hover:bg-black active:scale-95 transition-all duration-200 shadow-sm
                            flex items-center justify-center gap-2 md:p-0"
                        >
                            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-sm font-medium md:hidden">Search</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
