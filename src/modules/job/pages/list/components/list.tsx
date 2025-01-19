import { Card, CardContent } from '@/components/ui/card';
import JobCard from './card';

function JobList() {
    const jobData = {
        title: 'Scrum Master',
        company: 'Simple Tech Investment',
        salary: '$1,000 - 3,000 USD',
        location: 'Ho Chi Minh',
        tags: ['Scrum', 'Agile', 'Project Manager'],
        postedTime: '1 hour',
        isHot: true,
    };

    return (
        <div className="grid grid-cols-10 gap-4 mt-8 bg-transparent h-fit">
            <div className="w-full col-span-10 xl:col-span-4">
                <JobCard {...jobData} />
                <JobCard {...jobData} />
                <JobCard {...jobData} />
            </div>
            <Card className="hidden xl:block p-4 bg-white shadow-md rounded-lg col-span-6 sticky top-20 self-start ">
                <CardContent className="flex flex-wrap items-center justify-between !p-0">
                    <h1>This card sticks to the screen when you scroll past it.</h1>
                    <br />
                </CardContent>
            </Card>
        </div>
    );
}

export default JobList;
