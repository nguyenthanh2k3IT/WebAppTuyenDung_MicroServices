import Image from '@/components/image';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
    id: string;
    title: string;
    company: string;
    salary: string;
    location: string;
    tags: string[];
    postedTime: string;
    isHot: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ id, title, company, salary, location, tags, postedTime, isHot }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/viec-lam?view=${id}`);
    };

    return (
        <div
            className="bg-white shadow-md rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 transition"
            onClick={handleClick}
        >
            <p className="text-gray-500 text-sm tracking-wider mb-2">Posted {postedTime} ago</p>
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <div className="flex items-center gap-2">
                        <Image
                            src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/IY6cZZgoPicaUFbVESOmtsPM58gnYddY_1667546652____20e2ee8f27e064dfaf8b40ace41350c9.png"
                            alt="img"
                            shape="square"
                            className="w-12 h-12 border-2 border-gray-200"
                        />
                        <p className="text-gray-800">{company}</p>
                    </div>
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
