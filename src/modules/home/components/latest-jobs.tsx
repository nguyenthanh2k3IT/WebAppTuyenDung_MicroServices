import { Badge } from '@/components/ui/badge';
import { Facebook, Twitter, Linkedin, Globe } from 'lucide-react';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    socialIcon: 'twitter' | 'facebook' | 'linkedin' | 'skype' | 'globe';
}

const jobs: Job[] = [
    {
        id: 1,
        title: 'Senior front-end developer',
        company: 'Datebase Management Company, Permanent - New York',
        location: 'Menlo park, CA',
        type: 'FULL-TIME',
        socialIcon: 'twitter',
    },
    {
        id: 2,
        title: 'Senior front-end developer',
        company: 'Datebase Management Company, Permanent - New York',
        location: 'Menlo park, CA',
        type: 'FULL-TIME',
        socialIcon: 'facebook',
    },
    {
        id: 3,
        title: 'Senior front-end developer',
        company: 'Datebase Management Company, Permanent - New York',
        location: 'Menlo park, CA',
        type: 'FULL-TIME',
        socialIcon: 'globe',
    },
    {
        id: 4,
        title: 'Senior front-end developer',
        company: 'Datebase Management Company, Permanent - New York',
        location: 'Menlo park, CA',
        type: 'FULL-TIME',
        socialIcon: 'linkedin',
    },
];

const getSocialIcon = (type: Job['socialIcon']) => {
    const iconProps = { className: 'w-6 h-6' };
    switch (type) {
        case 'twitter':
            return <Twitter {...iconProps} className="w-6 h-6 text-[#1DA1F2]" />;
        case 'facebook':
            return <Facebook {...iconProps} className="w-6 h-6 text-[#4267B2]" />;
        case 'linkedin':
            return <Linkedin {...iconProps} className="w-6 h-6 text-[#0077B5]" />;
        case 'globe':
            return <Globe {...iconProps} className="w-6 h-6 text-[#FF0000]" />;
        default:
            return null;
    }
};

const LatestJobs = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">
                    Latest <span className="text-app-primary">Jobs</span>
                </h2>
                <p className="text-gray-600 mt-2">Here you can see</p>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-lg p-6 shadow-md cursor-pointer hover:bg-gray-200 transition-shadow duration-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className="bg-gray-50 p-3 rounded-full">{getSocialIcon(job.socialIcon)}</div>
                            <div>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">{job.company}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Globe className="w-4 h-4" />
                                <span>{job.location}</span>
                            </div>
                            <Badge
                                variant="secondary"
                                className={`px-4 py-1 ${
                                    job.socialIcon === 'twitter'
                                        ? 'bg-[#1DA1F2] text-white'
                                        : job.socialIcon === 'facebook'
                                        ? 'bg-[#4267B2] text-white'
                                        : job.socialIcon === 'linkedin'
                                        ? 'bg-[#0077B5] text-white'
                                        : job.socialIcon === 'skype'
                                        ? 'bg-[#00AFF0] text-white'
                                        : 'bg-[#FF0000] text-white'
                                }`}
                            >
                                {job.type}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestJobs;
