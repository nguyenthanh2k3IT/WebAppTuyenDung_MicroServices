import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const SearchBar = () => {
    return (
        <div className="relative -mt-11 px-4 sm:px-6 lg:px-8">
            <div className="bg-app-primary rounded-full py-6 px-8">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Professional Input */}
                    <div className="w-full md:w-1/3">
                        <Input
                            type="text"
                            placeholder="All Professionals"
                            className="h-12 rounded-full border-0 bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="w-full md:w-1/3">
                        <Input
                            type="text"
                            placeholder="Any Location"
                            className="h-12 rounded-full border-0 bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>

                    {/* Service Select */}
                    <div className="w-full md:w-1/3">
                        <Select>
                            <SelectTrigger className="h-12 rounded-full border-0 bg-white focus:ring-0">
                                <SelectValue placeholder="ALL Service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">ALL Service</SelectItem>
                                <SelectItem value="it">IT & Programming</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="writing">Writing</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search Button */}
                    <Button size="icon" className="h-12 w-12 rounded-full bg-[#1F1F1F] hover:bg-[#000000]">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
