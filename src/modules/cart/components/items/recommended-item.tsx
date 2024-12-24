import { Heart } from 'lucide-react';

interface RecommendedItemProps {
    image: string;
    title: string;
}

function RecommendedItem({ image, title }: RecommendedItemProps) {
    return (
        <div className="w-40 flex-shrink-0 relative">
            <img src={image} alt={title} className="w-full h-48 object-cover mb-2" />
            <p className="text-sm">{title}</p>
            <button className="absolute top-2 right-2 bg-white rounded-full p-1">
                <Heart size={16} />
            </button>
        </div>
    );
}

export default RecommendedItem;
