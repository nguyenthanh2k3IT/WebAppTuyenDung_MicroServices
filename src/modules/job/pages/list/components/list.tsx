import GeneratorHelper from '@/helpers/generator.helper';
import JobCard from './card';
import JobInfo from './job-info';

const generateRandomJobs = (count = 10) => {
    const titles = [
        'Scrum Master',
        'Backend Developer',
        'Frontend Developer',
        'DevOps Engineer',
        'QA Engineer',
        'Project Manager',
        'Product Owner',
        'UI/UX Designer',
        'Data Scientist',
        'Mobile Developer',
    ];
    const companies = [
        'Simple Tech Investment',
        'Innovative Solutions',
        'Agile Corp',
        'Dev Masters',
        'Cloud Tech',
        'AI Ventures',
        'FastCode Ltd',
        'Big Data Analytics',
        'Cyber Security Hub',
        'Blockchain Global',
    ];
    const salaries = [
        '$1,000 - 3,000 USD',
        '$2,000 - 4,000 USD',
        '$1,500 - 3,500 USD',
        '$2,500 - 5,000 USD',
        '$3,000 - 6,000 USD',
    ];
    const locations = ['Ho Chi Minh', 'Hanoi', 'Da Nang', 'Singapore', 'Remote'];
    const tagsList = [
        ['Scrum', 'Agile'],
        ['Java', 'Spring Boot'],
        ['React', 'TypeScript'],
        ['AWS', 'DevOps'],
        ['C#', '.NET'],
        ['Python', 'Data Science'],
        ['Figma', 'UI/UX'],
        ['Docker', 'Kubernetes'],
        ['Cyber Security', 'PenTesting'],
        ['Ethereum', 'Solidity'],
    ];

    return Array.from({ length: count }, () => ({
        id: GeneratorHelper.newGuid(),
        title: titles[Math.floor(Math.random() * titles.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        salary: salaries[Math.floor(Math.random() * salaries.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        tags: tagsList[Math.floor(Math.random() * tagsList.length)],
        postedTime: `${Math.floor(Math.random() * 24) + 1} hours`,
        isHot: Math.random() > 0.5,
    }));
};

function JobList() {
    const jobList = generateRandomJobs(10);

    return (
        <div className="grid grid-cols-10 gap-4 mt-8 bg-transparent h-fit">
            <div className="w-full col-span-10 xl:col-span-4 space-y-4">
                {jobList.map((item, index) => {
                    return <JobCard {...item} key={index} />;
                })}
            </div>
            <JobInfo />
        </div>
    );
}

export default JobList;
