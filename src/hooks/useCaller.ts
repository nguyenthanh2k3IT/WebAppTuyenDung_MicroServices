import { AxiosRequestConfig } from 'axios';
import { API } from '@/utils/axios';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UseCallerState<T> extends ApiRes<T> {
    loading: boolean;
    callApi: (
        endpoint: string,
        options: {
            method: 'POST' | 'PUT' | 'DELETE' | 'GET';
            body?: any;
            headers?: AxiosRequestConfig['headers'];
        },
        successMessage?: string,
        showToast?: boolean,
    ) => Promise<ApiRes<T>>;
    setLoading: (loading: boolean) => void;
}

function useCaller<T>(): UseCallerState<T> {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [succeeded, setSucceeded] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const callApi = async (
        endpoint: string,
        {
            method,
            body,
            headers,
        }: {
            method: 'POST' | 'PUT' | 'DELETE' | 'GET';
            body?: any;
            headers?: AxiosRequestConfig['headers'];
        },
        successMessage?: string,
        showToast: boolean = true,
    ): Promise<ApiRes<T>> => {
        setLoading(true);
        try {
            const defaultHeaders: AxiosRequestConfig['headers'] = {
                'Content-Type': 'application/json',
                ...headers,
            };

            const requestBody = body instanceof FormData ? body : JSON.stringify(body);

            const response = await API.request<ApiRes<T>>({
                url: endpoint,
                method,
                data: requestBody,
                headers: defaultHeaders,
            });

            const { succeeded, errorMessage, data } = response.data;
            setSucceeded(succeeded);
            setErrorMessage(errorMessage);
            setData(data);

            if (!succeeded && errorMessage) {
                if (showToast)
                    toast({
                        variant: 'destructive',
                        title: 'Action alert',
                        description: errorMessage,
                        duration: 1500,
                    });
            }
            if (succeeded) {
                if (showToast)
                    toast({
                        variant: 'success',
                        title: 'Action alert',
                        description: successMessage || 'Your action was successfully completed',
                        duration: 1500,
                    });
            }

            return response.data;
        } catch (error) {
            setSucceeded(false);
            const errorMsg = 'An error occurred, please try again.';
            setErrorMessage(errorMsg);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: errorMsg,
                duration: 1500,
                className: 'max-w-md',
            });
            console.log(`*** useCaller err: [Method: ${method}] - [Endpoint: ${endpoint}] ***`);
            console.log(error);
            return {
                succeeded: false,
                errorMessage: errorMsg,
                data: null,
            };
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, succeeded, errorMessage, callApi, setLoading };
}

export default useCaller;
