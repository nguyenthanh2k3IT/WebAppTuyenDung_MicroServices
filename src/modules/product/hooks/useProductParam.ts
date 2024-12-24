import { useSearchParams } from 'react-router-dom';

type QueryParams = {
    q: string;
    category?: string;
    gender?: string;
    brand?: string;
    sale?: string;
    sort?: string;
    price?: string;
    pageIndex?: number;
    pageSize?: number;
};

const useProductParams = (): QueryParams => {
    const [searchParams] = useSearchParams();

    return {
        q: searchParams.get('q') || '',
        category: searchParams.get('category') || undefined,
        gender: searchParams.get('gender') || undefined,
        brand: searchParams.get('brand') || undefined,
        sale: searchParams.get('sale') || undefined,
        sort: searchParams.get('sort') || undefined,
        price: searchParams.get('price') || undefined,
        pageIndex: Number(searchParams.get('pageIndex')) || 1,
        pageSize: Number(searchParams.get('pageSize')) || 16,
    };
};

export default useProductParams;
