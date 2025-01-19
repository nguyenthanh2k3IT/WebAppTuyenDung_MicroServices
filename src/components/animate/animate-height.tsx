import { useState, useEffect, useRef } from 'react';

interface AnimateHeightProps {
    isVisible: boolean;
    children: React.ReactNode;
    duration?: number;
}

const AnimateHeight = ({ isVisible, children, duration = 300 }: AnimateHeightProps) => {
    const [height, setHeight] = useState<number | undefined>(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            const height = ref.current?.scrollHeight;
            setHeight(height);
        } else {
            setHeight(0);
        }
    }, [isVisible]);

    return (
        <div
            className="overflow-hidden transition-[height]"
            style={{ height: height ? `${height}px` : '0px', transitionDuration: `${duration}ms` }}
        >
            <div ref={ref}>{children}</div>
        </div>
    );
};

export default AnimateHeight;
