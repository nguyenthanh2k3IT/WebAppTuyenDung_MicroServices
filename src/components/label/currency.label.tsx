import React from 'react';

interface CurrencyProps {
    className?: string;
    type: 'dollar' | 'euro' | 'vnd';
}

const Currency: React.FC<CurrencyProps> = ({ className, type }) => {
    const getCurrencySymbol = () => {
        switch (type) {
            case 'dollar':
                return '$';
            case 'euro':
                return '£';
            case 'vnd':
                return '₫';
            default:
                return '';
        }
    };

    return <span className={className}>{getCurrencySymbol()}</span>;
};

export default Currency;
