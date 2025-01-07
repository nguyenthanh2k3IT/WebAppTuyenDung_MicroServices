import { useState } from 'react';

// const [data, setData] = useObjectState({
//     username: 'abc',
//     email: 'xyz',
//     password: 'bbb',
// });

function useObjectState<T extends object>(initialState: T) {
    const [state, setState] = useState<T>(initialState);

    const setKeyValue = <K extends keyof T>(key: K, value: T[K]) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const setMultipleValues = (newValues: Partial<T>) => {
        setState((prevState) => ({
            ...prevState,
            ...newValues,
        }));
    };

    const resetState = () => {
        setState(initialState);
    };

    const handleObjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;

        let newValue: T[keyof T];

        if (type === 'checkbox') {
            newValue = checked as unknown as T[keyof T];
        } else if (type === 'number') {
            newValue = parseFloat(value) as unknown as T[keyof T];
        } else {
            newValue = value as unknown as T[keyof T];
        }

        setKeyValue(id as keyof T, newValue);
    };

    return [state, setKeyValue, setMultipleValues, resetState, handleObjectChange] as const;
};

export default useObjectState;