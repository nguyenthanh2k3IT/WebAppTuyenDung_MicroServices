import SingleSelect from '@/components/select/index';
import useProductFilter from '@/hooks/useProductFilter';
import useSelect from '@/hooks/useSelect';
import { ProductFilterState } from '@/redux/slicers/product-filter.slice';
import CategoryService from '@/services/category.service';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allOption, isSaleOption, priceRangeOption, sortOption } from '../../datas/product-filter.option';
import BrandService from '@/services/brand.service';
import GenderService from '@/services/gender.service';

type ProductFilterSelection = {
    gender?: string;
    category?: string;
    brand?: string;
    sale?: string;
    sort?: string;
    price?: string;
};

type ProductFilterOptions = {
    genders: SelectOption[];
    categories: SelectOption[];
    brands: SelectOption[];
    isSale: SelectOption[];
    sorts: SelectOption[];
    prices: SelectOption[];
};

function ProductFilterOption() {
    const navigate = useNavigate();
    const { filter, createParams } = useProductFilter();
    const [options, setOptions] = useState<ProductFilterOptions>({
        genders: [],
        categories: [],
        brands: [],
        isSale: isSaleOption,
        sorts: sortOption,
        prices: priceRangeOption,
    });
    const [selection, setSelection] = useState<ProductFilterSelection>({
        gender: filter.gender,
        category: filter.category,
        brand: filter.brand,
        sale: filter.sale,
        sort: filter.sort,
        price: filter.price,
    });
    const { transformSelect } = useSelect({
        initialValue: [],
    });

    useEffect(() => {
        const fetchData = async (service: () => Promise<any>, key: keyof typeof options) => {
            const data = await service();
            const transformedData = transformSelect(data, 'slug', 'name');
            setOptions((prev) => ({
                ...prev,
                [key]: [allOption, ...transformedData],
            }));
        };

        const dataLoaders: [() => Promise<any>, keyof typeof options][] = [
            [BrandService.getAll, 'brands'],
            [CategoryService.getAll, 'categories'],
            [GenderService.getAll, 'genders'],
        ];

        dataLoaders.forEach(([service, key]) => {
            if (options[key].length === 0) {
                fetchData(service, key);
            }
        });
    }, []);

    useEffect(() => {
        const option: ProductFilterState = {
            pageIndex: filter.pageIndex,
            pageSize: filter.pageSize,
            ...(selection.gender && { gender: selection.gender }),
            ...(selection.brand && { brand: selection.brand }),
            ...(selection.category && { category: selection.category }),
            ...(selection.sale && { sale: selection.sale }),
            ...(selection.sort && { sort: selection.sort }),
            ...(selection.price && { price: selection.price }),
        };

        if (
            selection.brand ||
            selection.category ||
            selection.gender ||
            selection.sale ||
            selection.sort ||
            selection.price
        ) {
            const params = createParams(option);
            navigate(`/product?${params}`);
        }
    }, [selection.brand, selection.category, selection.gender, selection.sale, selection.sort, selection.price]);

    useEffect(() => {
        const fetchData = async () => {
            const data =
                selection.gender! === 'all'
                    ? await CategoryService.getAll()
                    : await CategoryService.getByGenderSlug(selection.gender!);
            const transformedData = transformSelect(data, 'slug', 'name');
            setOptions((prev) => ({
                ...prev,
                categories: [allOption, ...transformedData],
            }));
        };

        if (selection.gender) fetchData();
    }, [selection.gender]);

    const handleChange = (key: keyof ProductFilterState) => (option: SelectOption) => {
        if (filter[key] !== option.value) {
            setSelection((prev) => ({
                ...prev,
                [key]: option.value,
            }));
        }
    };

    return (
        <>
            <SingleSelect
                options={options.genders}
                onChange={handleChange('gender')}
                defaultValue={filter.gender}
                placeHolder="Gender"
                triggerStyle="!border-t !border-b !border-l-0 !border-r-0 !border-gray-300 !py-5 text-base font-semibold"
            />
            <SingleSelect
                options={options.categories}
                onChange={handleChange('category')}
                defaultValue={filter.category}
                placeHolder="Category"
                triggerStyle="!border-t !border-b !border-l-0 !border-r-0 !border-gray-300 !py-5 text-base font-semibold"
            />
            <SingleSelect
                options={options.brands}
                onChange={handleChange('brand')}
                defaultValue={filter.brand}
                placeHolder="Brand"
                triggerStyle="!border-t !border-b !border-l-0 !border-r-0 !border-gray-300 !py-5 text-base font-semibold"
            />
            <SingleSelect
                options={options.isSale}
                onChange={handleChange('sale')}
                defaultValue={filter.sale}
                placeHolder="Sale"
                triggerStyle="!border-t !border-b !border-l-0 !border-r-0 !border-gray-300 !py-5 text-base font-semibold"
            />
            <SingleSelect
                options={options.sorts}
                onChange={handleChange('sort')}
                defaultValue={filter.sort}
                placeHolder="Sort"
                triggerStyle="!border-t !border-b !border-l-0 !border-r-0 !border-gray-300 !py-5 text-base font-semibold"
            />
            <SingleSelect
                options={options.prices}
                onChange={handleChange('price')}
                defaultValue={filter.price}
                placeHolder="Price Range"
                triggerStyle="!border-t !border-b !border-l-0 !border-r-0 !border-gray-300 !py-5 text-base font-semibold"
            />
        </>
    );
}

export default memo(ProductFilterOption);
