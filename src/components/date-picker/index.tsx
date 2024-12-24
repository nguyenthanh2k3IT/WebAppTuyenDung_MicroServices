'use client';

import * as React from 'react';
import dayjs from 'dayjs'; // Import Day.js
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
    onChangeDate: (date: Date) => void;
    initialDate?: Date;
    placeHolder?: string;
}

export function DatePicker({
    onChangeDate,
    initialDate = dayjs().toDate(),
    placeHolder = 'Pick a date',
}: DatePickerProps) {
    const [date, setDate] = React.useState<Date>(initialDate);

    const handleChangeDate = (date: Date | undefined) => {
        if (date) {
            setDate(date);
            onChangeDate(date);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? dayjs(date).format('DD-MM-YYYY') : <span>{placeHolder}</span>}{' '}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => handleChangeDate(date)} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
