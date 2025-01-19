import { useState, useEffect, useRef } from 'react';

interface CollapseProps {
    isOpen: boolean;
    children: React.ReactNode;
    duration?: number;
    className?: string;
}

/**
 * Collapse Component - Creates a smooth collapse/expand animation
 * Similar to AnimateHeight but with width support and different use case
 * @example
 * <Collapse isOpen={isExpanded}>
 *   <div>Collapsible content</div>
 * </Collapse>
 *
 * @param isOpen - Boolean to control collapsed state
 * @param duration - Animation duration in milliseconds (default: 300)
 * @param className - Additional classes to apply
 */
const Collapse = ({ isOpen, children, duration = 300, className = '' }: CollapseProps) => {
    const [height, setHeight] = useState<number | undefined>(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const height = ref.current?.scrollHeight;
            setHeight(height);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div
            className={`transition-all overflow-hidden ${className}`}
            style={{
                height: height ? `${height}px` : '0px',
                opacity: height ? 1 : 0,
                transitionDuration: `${duration}ms`,
            }}
        >
            <div ref={ref}>{children}</div>
        </div>
    );
};

export default Collapse;
