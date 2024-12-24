import { getToken } from '@/helpers/storage.helper';

export const uploadMultiImage = async (files: File[]): Promise<string[]> => {
    try {
        const formData = new FormData();
        const accessToken = getToken();

        if (files.length === 0) {
            return [];
        }

        files.forEach((file) => {
            formData.append('files', file, file.name);
        });

        const response = await fetch('https://localhost:7000/storage-service/api/Storage/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: ApiRes<FileStorage[]> = await response.json();

        let urls: string[] = [];
        if (responseData.succeeded && responseData.data !== null && responseData.data.length > 0) {
            urls = responseData.data.map((item: FileStorage) => item.url);
        }

        return urls;
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const uploadImage = async (file: File): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append('files', file, file.name);
        const accessToken = getToken();

        const response = await fetch('https://localhost:7000/storage-service/api/Storage/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: ApiRes<FileStorage[]> = await response.json();

        let url: string | null = null;
        if (responseData.succeeded && responseData.data !== null && responseData.data.length > 0) {
            url = responseData.data[0].url;
        }

        return url;
    } catch (e) {
        console.log(e);
        return null;
    }
};
