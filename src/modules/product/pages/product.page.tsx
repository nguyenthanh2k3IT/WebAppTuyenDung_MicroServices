import ProductPageBreadcrumb from '../components/breadcrumb/product-page.breadcrumb';
import { useEffect } from 'react';
import useProductFilter from '@/hooks/useProductFilter';
import { useLocation, useSearchParams } from 'react-router-dom';
import ProductFilterOption from '../components/filter/product.filter';
import ProductListContainer from '../components/container/product-list.container';
import '../styles/index.css';

export default function ProductPage() {
    const { filter, setFilter } = useProductFilter();
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;
    const gender = searchParams.get('gender') || undefined;
    const brand = searchParams.get('brand') || undefined;
    const sale = searchParams.get('sale') || undefined;
    const sort = searchParams.get('sort') || undefined;
    const price = searchParams.get('price') || undefined;
    const pageIndex = Number(searchParams.get('pageIndex')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 16;
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        if (
            pageIndex !== filter.pageIndex ||
            pageSize !== filter.pageSize ||
            price !== filter.price ||
            q !== filter.textSearch ||
            category !== filter.category ||
            gender !== filter.gender ||
            brand !== filter.brand ||
            sort !== filter.sort ||
            sale !== filter.sale
        ) {
            setFilter({
                pageIndex: pageIndex,
                pageSize: filter.pageSize,
                textSearch: q ?? '',
                category,
                gender,
                brand,
                sort,
                price,
                sale,
            });
        }
    }, [q, category, gender, pageIndex, pageSize, brand, sale, sort, price, filter]);

    return (
        <div className="product-container">
            <ProductPageBreadcrumb />
            {filter.textSearch && (
                <div className="flex flex-col text-center py-2 border-b-2">
                    <span className="tracking-wide opacity-80">Your search results for:</span>
                    <h2 className="text-lg font-bold tracking-wider">"{filter.textSearch}"</h2>
                </div>
            )}
            <div className="bg-[#EEEEEE] py-2 product-padding flex justify-between border-l-0">
                <ProductFilterOption />
            </div>
            <div className="my-4">
                <ProductListContainer />
            </div>
        </div>
    );
}
