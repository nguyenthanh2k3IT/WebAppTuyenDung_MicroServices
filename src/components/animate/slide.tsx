import { useState, useEffect } from 'react';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface SlideProps {
    show: boolean;
    children: React.ReactNode;
    direction?: Direction;
    duration?: number;
    distance?: number;
    className?: string;
}

/**
 * Slide Component - Creates a sliding animation from any direction
 * @example
 * <Slide show={isVisible} direction="left" distance={50}>
 *   <div>Content to slide</div>
 * </Slide>
 *
 * @param show - Boolean to control visibility
 * @param direction - Slide direction (left/right/top/bottom)
 * @param duration - Animation duration in milliseconds (default: 300)
 * @param distance - Slide distance in pixels (default: 20)
 * @param className - Additional classes to apply
 */
const Slide = ({ show, children, direction = 'left', duration = 300, distance = 20, className = '' }: SlideProps) => {
    const [render, setRender] = useState(show);

    useEffect(() => {
        if (show) setRender(true);
        else {
            const timer = setTimeout(() => setRender(false), duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration]);

    if (!render) return null;

    const getTransform = (show: boolean) => {
        if (!show) {
            switch (direction) {
                case 'left':
                    return `translateX(-${distance}px)`;
                case 'right':
                    return `translateX(${distance}px)`;
                case 'top':
                    return `translateY(-${distance}px)`;
                case 'bottom':
                    return `translateY(${distance}px)`;
            }
        }
        return 'translate(0)';
    };

    return (
        <div
            className={`transition-all ${className}`}
            style={{
                transform: getTransform(show),
                opacity: show ? 1 : 0,
                transitionDuration: `${duration}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default Slide;
