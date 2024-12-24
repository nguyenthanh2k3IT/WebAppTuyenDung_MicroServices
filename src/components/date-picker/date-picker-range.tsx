'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import dayjs from 'dayjs';

interface DatePickerWithRangeProps {
    from?: Date;
    to?: Date;
    placeHolder?: string;
    onChangeDate: (date: DateRange) => void;
}

export function DatePickerWithRange({ from, to, placeHolder = 'Pick a date', onChangeDate }: DatePickerWithRangeProps) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: from || dayjs().toDate(),
        to: to || dayjs().add(30, 'day').toDate(),
    });

    const handleChangeDate = (date: DateRange | undefined) => {
        if (date) {
            setDate(date);
            onChangeDate(date);
        }
    };

    React.useEffect(() => {
        setDate({
            from,
            to,
        });
    }, [from, to]);

    return (
        <div className={cn('grid gap-2')}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                    >
                        <CalendarIcon className="mr-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>{placeHolder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleChangeDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
