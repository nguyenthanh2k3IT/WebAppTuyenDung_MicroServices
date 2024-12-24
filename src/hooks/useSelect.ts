import { useState, useCallback, useMemo } from 'react';

type SelectOption = {
    value: string;
    label: string;
};

type useSelectProps = {
    initialValue?: SelectOption[];
};

function useSelect({ initialValue = [] }: useSelectProps) {
    const [select, setSelect] = useState<SelectOption[]>(initialValue);

    const onSelectChange = useCallback((options: SelectOption[], callback?: () => void) => {
        setSelect(options);
        if (callback) callback();
    }, []);

    const transformSelect = useCallback((data: any[], valueKey: string, labelKey: string): SelectOption[] => {
        return data.map((item) => ({
            value: item[valueKey],
            label: item[labelKey],
        }));
    }, []);

    const memoizedSelect = useMemo(() => select, [select]);

    return { select: memoizedSelect, setSelect, onSelectChange, transformSelect };
}

export default useSelect;

// Dùng cùng component Select và SelectMulti
