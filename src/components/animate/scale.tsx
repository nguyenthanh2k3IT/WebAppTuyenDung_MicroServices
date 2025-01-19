import { useState, useEffect } from 'react';

interface ScaleProps {
    show: boolean;
    children: React.ReactNode;
    duration?: number;
    scale?: number;
    className?: string;
}

/**
 * Scale Component - Creates a smooth scaling animation
 * @example
 * <Scale show={isVisible} scale={0.9}>
 *   <div>Content to scale</div>
 * </Scale>
 *
 * @param show - Boolean to control visibility
 * @param scale - Scale factor when hidden (default: 0.95)
 * @param duration - Animation duration in milliseconds (default: 200)
 * @param className - Additional classes to apply
 */
const Scale = ({ show, children, duration = 200, scale = 0.95, className = '' }: ScaleProps) => {
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
            className={`transition-all ${className}`}
            style={{
                transform: show ? 'scale(1)' : `scale(${scale})`,
                opacity: show ? 1 : 0,
                transitionDuration: `${duration}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default Scale;
