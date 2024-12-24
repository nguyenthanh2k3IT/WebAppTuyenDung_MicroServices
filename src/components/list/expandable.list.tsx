import useFetch from '@/hooks/useFetch';
import { Fragment, useEffect, useState, useCallback, useMemo, useImperativeHandle, forwardRef } from 'react';
import { Skeleton } from '../ui/skeleton';
import LoadingButton from '../ui/loading-button';
import Empty from '@/assets/svg/not-found.svg';

interface ExpandableListHandle<T> {
    handleRemoveItem: (id: string | number) => void;
    handleModifiedItem: (id: string | number, modifiedData: T) => void;
}

interface ExpandableListProps<T> {
    api: string;
    totalRecord: number;
    loadingStyle?: string;
    contentStyle?: string;
    param?: object;
    dependency?: any[];
    skeleton?: React.ReactNode;
    filter?: React.ReactNode;
    content: (item: T) => JSX.Element;
}

const ExpandableList = forwardRef<ExpandableListHandle<any>, ExpandableListProps<any>>(
    (
        {
            api,
            totalRecord,
            param,
            loadingStyle = 'w-full h-64 my-4',
            contentStyle,
            dependency = [],
            skeleton,
            filter,
            content,
        }: ExpandableListProps<any>,
        ref,
    ) => {
        const [expandableData, setExpandableData] = useState<any[] | null>([]);
        const [defaultParam, setDefaultParam] = useState({
            Skip: 0,
            TotalRecord: totalRecord,
            TextSearch: '',
            ...param,
        });

        const memoizedParam = useMemo(() => defaultParam, [defaultParam]);

        useEffect(() => {
            if (param) {
                setDefaultParam((prevDefaultParam) => ({
                    ...prevDefaultParam,
                    ...param,
                }));
            }
        }, [param]);

        const { data, loading } = useFetch<any[]>(api, { ...memoizedParam }, [memoizedParam, ...dependency]);

        useEffect(() => {
            if (data && expandableData) {
                const newData = data.filter(
                    (item) =>
                        !expandableData.some(
                            (existingItem) =>
                                (existingItem as { id: string | number }).id === (item as { id: string | number }).id,
                        ),
                );
                if (newData.length > 0) {
                    setExpandableData((prevExpandableData) => [...(prevExpandableData ?? []), ...newData]);
                }
            }
        }, [data]);

        const handleLoadMoreData = useCallback(() => {
            setDefaultParam((prevParam) => ({
                ...prevParam,
                Skip: prevParam.Skip + prevParam.TotalRecord,
            }));
        }, []);

        const hasId = (item: any): item is { id: string | number } => {
            return (item && typeof item.id === 'string') || typeof item.id === 'number';
        };

        const handleRemoveItem = useCallback((id: string | number) => {
            setExpandableData((prevData) => (prevData ? prevData.filter((item) => hasId(item) && item.id !== id) : []));
        }, []);

        const handleModifiedItem = useCallback((id: string | number, modifiedData: any) => {
            setExpandableData((prevData) => {
                if (!prevData) return [];

                const itemToModify = prevData.find((item) => hasId(item) && item.id === id);

                if (itemToModify) {
                    return prevData.map((item) => (item === itemToModify ? { ...item, ...modifiedData } : item));
                }

                return prevData;
            });
        }, []);

        useImperativeHandle(ref, () => ({
            handleRemoveItem,
            handleModifiedItem,
        }));

        return (
            <Fragment>
                <div className="flex items-center space-x-2 py-2">{filter}</div>
                <div className={contentStyle}>
                    {expandableData?.map((val, index) => {
                        return <Fragment key={index}>{content(val)}</Fragment>;
                    })}

                    {loading &&
                        (skeleton
                            ? skeleton
                            : Array.from({ length: defaultParam.TotalRecord }).map((_, index) => (
                                  <Skeleton className={loadingStyle} key={index} />
                              )))}
                </div>
                {!loading && (!expandableData || expandableData?.length === 0) && (
                    <div>
                        <img src={Empty} alt="empty" className="w-[50%] mx-auto" />
                    </div>
                )}

                {!loading && expandableData && expandableData.length > 0 && (
                    <div className="flex justify-center mt-6 my-4">
                        <LoadingButton isLoading={loading} loadingText="Loading..." onClick={handleLoadMoreData}>
                            LOAD MORE
                        </LoadingButton>
                    </div>
                )}
            </Fragment>
        );
    },
);

export default ExpandableList;
