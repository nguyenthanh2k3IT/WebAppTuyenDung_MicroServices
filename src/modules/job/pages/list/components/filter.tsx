import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function JobFilter() {
    return (
        <Card className="p-4 bg-white shadow-md rounded-lg">
            <CardContent className="flex flex-wrap items-center justify-between !p-0">
                <div className="flex flex-wrap gap-4 items-center">
                    <Select>
                        <SelectTrigger className="w-[120px] select-trigger">
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="a">Select Level</SelectItem>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="mid">Mid</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[120px] select-trigger">
                            <SelectValue placeholder="Working Model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="a">Select Working Model</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="onsite">Onsite</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[120px] select-trigger">
                            <SelectValue placeholder="Salary" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="a">Select Salary</SelectItem>
                            <SelectItem value="below-500">Below 500</SelectItem>
                            <SelectItem value="500-1000">500 - 1000</SelectItem>
                            <SelectItem value="above-1000">Above 1000</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[120px] select-trigger">
                            <SelectValue placeholder="Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="a">Select Industry</SelectItem>
                            <SelectItem value="software">Software</SelectItem>
                            <SelectItem value="hardware">Hardware</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Button className="mr-2">Tìm kiếm</Button>
                    <Button>Tìm kiếm</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default JobFilter;
