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
    const iconProps = { className: 'w-5 h-5 sm:w-6 sm:h-6' };
    switch (type) {
        case 'twitter':
            return <Twitter {...iconProps} className="w-5 h-5 sm:w-6 sm:h-6 text-[#1DA1F2]" />;
        case 'facebook':
            return <Facebook {...iconProps} className="w-5 h-5 sm:w-6 sm:h-6 text-[#4267B2]" />;
        case 'linkedin':
            return <Linkedin {...iconProps} className="w-5 h-5 sm:w-6 sm:h-6 text-[#0077B5]" />;
        case 'globe':
            return <Globe {...iconProps} className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF0000]" />;
        default:
            return null;
    }
};

const LatestJobs = () => {
    return (
        <div className="content-padding py-8 sm:py-12">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold">
                    Latest <span className="text-app-primary">Jobs</span>
                </h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Here you can see</p>
            </div>

            {/* Jobs List */}
            <div className="space-y-3 sm:space-y-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-lg p-4 sm:p-6 shadow-md cursor-pointer hover:bg-gray-200 transition-shadow duration-200"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            {/* Left Section */}
                            <div className="flex items-start sm:items-center gap-3 sm:gap-6">
                                <div className="bg-gray-50 p-2 sm:p-3 rounded-full shrink-0">
                                    {getSocialIcon(job.socialIcon)}
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold line-clamp-1">{job.title}</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-1">{job.company}</p>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 mt-2 sm:mt-0">
                                <div className="flex items-center gap-1 sm:gap-2 text-gray-600">
                                    <Globe className="w-4 h-4" />
                                    <span className="text-xs sm:text-sm">{job.location}</span>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className={`px-2 sm:px-4 py-1 text-xs sm:text-sm whitespace-nowrap ${
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestJobs;
