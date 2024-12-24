import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import useProfile from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const RatingBar = ({
    label,
    minLabel,
    maxLabel,
    value,
}: {
    label: string;
    minLabel: string;
    maxLabel: string;
    value: number;
}) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
            <span className="font-medium text-sm flex items-center gap-1">{label}</span>
        </div>
        <Progress value={value} className="h-2 bg-gray-200 rounded-md" />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
        </div>
    </div>
);

interface ProductRatingProps {
    id: string;
    avgRating: number;
    rated: number;
}

export default function ProductRatings({ id, avgRating, rated }: ProductRatingProps) {
    const { profile } = useProfile();
    const navigate = useNavigate();
    const { openModal } = useModalContext();

    const handleOpenModal = () => {
        if (!profile) {
            navigate('/auth/login');
            return;
        }
        openModal(ModalType.AddRating, {
            id,
            rated,
        });
    };

    return (
        <div className="w-full mt-4 space-y-6">
            <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-5 w-5 ${i < avgRating ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill={i < avgRating ? 'currentColor' : 'none'}
                    />
                ))}
                <span className="text-gray-700 text-sm">({avgRating})</span>
                <span className="text-gray-500 text-sm">(43 Reviews)</span>
            </div>
            <p className="text-gray-600 text-sm">75% of customers recommend this product</p>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Customer Rating</h3>
                    <Button
                        onClick={handleOpenModal}
                        className="border-2 border-gray-400 bg-white text-black hover:bg-black hover:text-white hover:border-black transition"
                    >
                        Rate us here
                    </Button>
                </div>
                <RatingBar label="Size" minLabel="Runs Small" maxLabel="Runs Large" value={40} />
                <RatingBar label="Comfort" minLabel="Uncomfortable" maxLabel="Comfortable" value={60} />
                <RatingBar label="Quality" minLabel="Poor" maxLabel="Great" value={75} />
            </div>
        </div>
    );
}
