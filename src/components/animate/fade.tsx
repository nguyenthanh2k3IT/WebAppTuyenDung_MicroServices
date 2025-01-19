import { useState, useEffect } from 'react';

interface FadeProps {
    show: boolean;
    children: React.ReactNode;
    duration?: number;
    className?: string;
}

/**
 * Fade Component - Creates a smooth fade in/out animation
 * @example
 * <Fade show={isVisible}>
 *   <div>Content to fade</div>
 * </Fade>
 *
 * @param show - Boolean to control visibility
 * @param duration - Animation duration in milliseconds (default: 200)
 * @param className - Additional classes to apply
 */
const Fade = ({ show, children, duration = 200, className = '' }: FadeProps) => {
    const [render, setRender] = useState(show);

    useEffect(() => {
        if (show) setRender(true);
        else {
            const timer = setTimeout(() => setRender(false), duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration]);

    if (!render) return null;

    return (
        <div
            className={`transition-opacity ${className}`}
            style={{
                opacity: show ? 1 : 0,
                transitionDuration: `${duration}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default Fade;
