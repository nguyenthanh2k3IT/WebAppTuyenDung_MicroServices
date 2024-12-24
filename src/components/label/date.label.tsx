interface DateLabelProps {
    startDate?: string | Date;
    endDate?: string | Date;
    className?: string;
}

function DateLabel({ startDate, endDate, className }: DateLabelProps) {
    const formatDate = (dateString: string | Date): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (startDate && !endDate) {
        return <span className={className}>{formatDate(startDate)}</span>;
    }

    if (!startDate && endDate) {
        return <span className={className}>{formatDate(endDate)}</span>;
    }

    if (startDate && endDate) {
        return (
            <span className={className}>
                {formatDate(startDate)} - {formatDate(endDate)}
            </span>
        );
    }

    return <span className={className}></span>;
}

export default DateLabel;
