import { useState, useEffect } from 'react';
import { API } from '@/utils/axios';
import { useToast } from '@/components/ui/use-toast';

interface UseFetchState<T> extends ApiRes<T> {
    loading: boolean;
}

function useFetch<T>(endpoint: string, params?: any, dependency?: any[]): UseFetchState<T> {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<T | null>(null);
    const [succeeded, setSucceeded] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (!endpoint) return;
            setLoading(true);
            try {
                const response = await API.get<ApiRes<T>>(endpoint, { params });
                const { succeeded, errorMessage, data } = response.data;

                setSucceeded(succeeded);
                setErrorMessage(errorMessage);
                setData(data);
                if (!succeeded && errorMessage) {
                    toast({
                        variant: 'destructive',
                        title: 'Thất bại',
                        description: errorMessage,
                        duration: 2000,
                    });
                }
            } catch (error) {
                setSucceeded(false);
                setErrorMessage('Xảy ra lỗi vui lòng thử lại');
                toast({
                    variant: 'destructive',
                    title: 'Thất bại',
                    description: 'Xảy ra lỗi vui lòng thử lại',
                    duration: 2000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependency || []);

    return { loading, data, succeeded, errorMessage };
}

export default useFetch;
