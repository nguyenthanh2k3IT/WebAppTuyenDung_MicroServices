import * as React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';

type SelectOption = {
    value: string;
    label: string;
};

type MultiSelectProps = {
    options: SelectOption[];
    defaultValue?: string[];
    placeHolder?: string;
    onChange: (option: SelectOption[]) => void;
};

function MultiSelect({ options, defaultValue = [], placeHolder = 'Vui lòng chọn ...', onChange }: MultiSelectProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<SelectOption[]>([]);
    const [inputValue, setInputValue] = React.useState('');

    // Cập nhật state selected khi options hoặc defaultValue thay đổi, và sử dụng `useMemo` để tính toán `initialSelected` một lần
    const memoizedDefaultValue = React.useMemo(() => defaultValue, [JSON.stringify(defaultValue)]);
    React.useEffect(() => {
        const initialSelected = options.filter((option) => memoizedDefaultValue.includes(option.value));
        setSelected(initialSelected);
    }, [memoizedDefaultValue, options]);

    // Gọi hàm onChange khi selected thay đổi
    React.useEffect(() => {
        onChange(selected);
    }, [selected, onChange]);

    const handleUnselect = React.useCallback((option: SelectOption) => {
        setSelected((prev) => prev.filter((s) => s.value !== option.value));
    }, []);

    const handleSelect = React.useCallback((option: SelectOption) => {
        setInputValue('');
        setSelected((prev) => [...prev, option]);
    }, []);

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (input.value === '') {
                    setSelected((prev) => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    });
                }
            }

            if (e.key === 'Escape') {
                input.blur();
            }
        }
    }, []);

    // Tính toán selectables một cách tối ưu chỉ khi `options` hoặc `selected` thay đổi
    const selectables = React.useMemo(() => {
        return options.filter((option) => !selected.some((s) => s.value === option.value));
    }, [options, selected]);

    return (
        <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
            <div className="group rounded-md border border-input px-3 py-2 text-sm">
                <div className="flex flex-wrap gap-1">
                    {selected.map((option, key) => (
                        <Badge key={key} variant="secondary">
                            {option.label}
                            <button
                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onClick={() => handleUnselect(option)}
                            >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            </button>
                        </Badge>
                    ))}

                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={placeHolder}
                        className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                <CommandList>
                    {open && selectables.length > 0 && (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((option, key) => (
                                    <CommandItem
                                        key={key}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={() => handleSelect(option)}
                                        className="cursor-pointer"
                                    >
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </div>
                    )}
                </CommandList>
            </div>
        </Command>
    );
}

export default React.memo(MultiSelect);
