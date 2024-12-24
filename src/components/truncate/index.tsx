import React from 'react';

interface TruncateTextProps {
    children: React.ReactNode;
    lines: number;
    className?: string;
}

const TruncateText: React.FC<TruncateTextProps> = ({ children, lines, className }) => {
    return (
        <div
            className={`truncate ${className}`}
            style={{
                display: '-webkit-box',
                WebkitLineClamp: lines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
        >
            {children}
        </div>
    );
};

export default TruncateText;
