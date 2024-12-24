import notFound from '@/assets/svg/not-found.svg';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
    to?: string;
    text?: string;
}

function NotFound({ to, text = 'Back to previous' }: NotFoundProps) {
    const navigate = useNavigate();

    const onNavigate = () => {
        if (to) navigate(to);
    };

    return (
        <div className="w-full justify-center column">
            <img src={notFound} alt="Not Found" className="mt-20 mx-auto" />
            <div className="flex ">
                <Button variant={'default'} className=" mt-8 mx-auto" onClick={onNavigate}>
                    {text}
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
