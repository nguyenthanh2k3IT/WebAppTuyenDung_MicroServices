import { memo, useState } from 'react';
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Empty from '@/assets/images/empty.jpg';

interface ImageProps {
    className?: string;
    src?: string;
    alt?: string;
    fallback?: string;
    shape?: 'circle' | 'square';
}

function Image({
    className = 'h-14 w-14',
    src = 'https://github.com/shadcn.png',
    alt = '@shadcn',
    fallback = 'CN',
    shape = 'circle',
}: ImageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const avatarShapeClass = shape === 'square' ? 'rounded-none' : 'rounded-full';

    return (
        <>
            <ShadcnAvatar
                className={cn(avatarShapeClass, className, 'relative cursor-pointer')}
                onClick={() => setIsModalOpen(true)}
            >
                <AvatarImage src={src || Empty} alt={alt} />
                <AvatarFallback>{fallback}</AvatarFallback>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </ShadcnAvatar>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <img
                        src={src || Empty}
                        alt={alt}
                        className="max-w-full max-h-full object-contain transition-transform transform scale-100 animate-scale-up"
                    />
                </div>
            )}
        </>
    );
}

export default memo(Image);
