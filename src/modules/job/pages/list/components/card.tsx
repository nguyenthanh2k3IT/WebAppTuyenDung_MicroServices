import React from 'react';

interface JobCardProps {
    title: string;
    company: string;
    salary: string;
    location: string;
    tags: string[];
    postedTime: string;
    isHot: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, salary, location, tags, postedTime, isHot }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 relative">
            <p className="text-gray-500 text-sm tracking-wider">Posted {postedTime} ago</p>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-gray-600">{company}</p>
                    <p className="text-green-700">{salary}</p>
                    <p className="text-gray-500">{location}</p>
                </div>
                {isHot && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded absolute top-4 right-4">
                        HOT
                    </span>
                )}
            </div>

            <div className="mt-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default JobCard;
