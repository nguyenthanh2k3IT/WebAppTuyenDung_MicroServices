import { Fragment, useEffect, useState } from 'react';
import useProductParams from '../../hooks/useProductParam';
import { ProductFilterState } from '@/redux/slicers/product-filter.slice';
import ProductService from '../../services/product.service';
import ProductCard from '../card/product.card';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import useProductFilter from '@/hooks/useProductFilter';
import '../../styles/index.css';

function ProductListContainer() {
    const navigate = useNavigate();
    const { createParams } = useProductFilter();
    const { q, category, gender, brand, sale, sort, price, pageIndex, pageSize } = useProductParams();
    const [paginatedList, setPaginatedList] = useState<PaginatedData<ProductOverview> | null>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const params: ProductFilterState = {
                pageIndex: pageIndex || 1,
                pageSize: pageSize || 16,
                textSearch: q || undefined,
                category,
                gender,
                brand,
                sale,
                sort,
                price,
            };
            const res = await ProductService.getPaginationOverview(params);
            setPaginatedList(res);
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        };

        fetchData();
    }, [q, category, gender, pageIndex, pageSize, brand, sale, sort, price]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handlePageChange = (newPageIndex: number) => {
        if (newPageIndex > 0 && newPageIndex <= paginatedList?.totalPages!) {
            const option: ProductFilterState = {
                pageIndex: newPageIndex,
                pageSize: pageSize || 16,
            };
            const params = createParams(option);
            navigate(`/product?${params}`);
            scrollToTop();
        }
    };

    return (
        <Fragment>
            <div className="product-padding grid grid-cols-4 gap-6">
                {loading &&
                    Array.from({ length: 16 }).map((_, index) => (
                        <Skeleton key={index} className="max-w-md h-[32rem]" />
                    ))}
                {!loading &&
                    paginatedList?.items?.map((item, index) => {
                        return <ProductCard key={index} product={item} />;
                    })}
            </div>
            <div className="flex justify-center mt-8 border-t-2 pt-4">
                <button
                    onClick={() => handlePageChange((pageIndex || 1) - 1)}
                    disabled={paginatedList?.hasPreviousPage === false}
                    className={`px-4 py-2 border ${
                        paginatedList?.hasPreviousPage ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    Prev
                </button>
                {Array.from({ length: paginatedList?.totalPages || 0 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 border ${
                            pageIndex === i + 1 ? 'bg-black text-white' : 'hover:bg-gray-200'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange((pageIndex || 1) + 1)}
                    disabled={paginatedList?.hasNextPage === false}
                    className={`px-4 py-2 border ${
                        paginatedList?.hasNextPage ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    Next
                </button>
            </div>
        </Fragment>
    );
}

export default ProductListContainer;
