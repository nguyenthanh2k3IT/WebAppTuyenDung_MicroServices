import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SelectOption = {
    value: string;
    label: string;
};

type SelectProps = {
    options: SelectOption[];
    defaultValue?: string | undefined;
    placeHolder?: string;
    triggerStyle?: string;
    itemStyle?: string;
    onChange: (option: SelectOption) => void;
};

const SingleSelect = ({
    options,
    defaultValue,
    triggerStyle = 'w-44',
    itemStyle = '',
    placeHolder = 'Vui lòng chọn ...',
    onChange,
}: SelectProps) => {
    const [selected, setSelected] = React.useState<SelectOption | null>(() => {
        return options.find((x) => x.value === defaultValue) || null;
    });

    React.useEffect(() => {
        if (selected) onChange(selected);
    }, [selected, onChange]);

    const memoizedDefaultValue = React.useMemo(() => defaultValue, [defaultValue]);

    React.useEffect(() => {
        const initialSelected = options.find((option) => option.value === memoizedDefaultValue);
        setSelected(initialSelected || null);
    }, [memoizedDefaultValue, options]);

    const handleSelect = (value: string) => {
        const option = options.find((x) => x.value === value);
        if (option) setSelected(option);
    };

    return (
        <Select value={selected?.value} onValueChange={handleSelect}>
            <SelectTrigger className={cn(triggerStyle)}>
                <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((item) => (
                        <SelectItem value={item.value} key={item.value} className={cn(itemStyle)}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default React.memo(SingleSelect);
