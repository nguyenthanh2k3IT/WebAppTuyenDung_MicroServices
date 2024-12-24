import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import Image from '@/components/image';
import ColumnSelect from '@/components/table/column-select';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { Label } from '@/components/ui/label';
import { StarIcon } from '@radix-ui/react-icons';
import Popover from '@/components/popover';
import ProductBreadcrumb from './components/product.breadcrumb';
import useFetch from '@/hooks/useFetch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { AdminNavigate } from '../../navigate';
import { Badge } from '@/components/ui/badge';
import Currency from '@/components/label/currency.label';
import DetailButton from '@/components/button/detail.button';

function ProductManagement() {
    const navigate = useNavigate();
    const { tableRef } = useTableRef();
    const [filter, setFilter] = useState({
        brand: '',
        category: '',
        gender: '',
    });

    const popoverComponent = (htmlContent: string) => {
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };

    useEffect(() => {}, []);

    const columns = useMemo<ColumnDef<Product>[]>(
        () => [
            ColumnSelect<Product>(),
            {
                accessorKey: 'image',
                header: 'IMAGE',
                cell: ({ row }) => {
                    return <Image src={row.original.image || ''} alt={'image'} shape="square" className="w-10 h-10" />;
                },
            },
            {
                accessorKey: 'slug',
                header: 'SLUG',
                cell: ({ row }) => {
                    return <div className="w-36">{row.original.slug}</div>;
                },
            },
            {
                accessorKey: 'name',
                header: 'NAME',
                cell: ({ row }) => {
                    return <p className="w-40">{row.original.name}</p>;
                },
            },
            {
                accessorKey: 'originalPrice',
                header: 'ORIGINAL PRICE',
                cell: ({ row }) => {
                    const originalPrice = row.original.originalPrice;
                    return (
                        <span className="w-14">
                            {originalPrice} <Currency type="euro" className="font-semibold" />
                        </span>
                    );
                },
            },
            {
                accessorKey: 'salePrice',
                header: 'Sale Price',
                cell: ({ row }) => {
                    const salePrice = row.original.salePrice;
                    return (
                        <div className="w-14">
                            {salePrice} <Currency type="euro" className="font-semibold" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'isSale',
                header: 'Is on sale',
                cell: ({ row }) => {
                    const isOnSale = row.original.isSale;
                    return (
                        <div className="w-24">
                            <Badge
                                style={{
                                    backgroundColor: isOnSale ? 'green' : 'red',
                                    color: 'white',
                                }}
                            >
                                {isOnSale ? 'On sale' : 'Not on sale'}
                            </Badge>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'category.name',
                header: 'CATEGORY',
                cell: ({ row }) => {
                    return (
                        <div className="w-36">
                            <Label className="font-semibold">{row.original.category?.name}</Label>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'brand.name',
                header: 'BRAND',
                cell: ({ row }) => {
                    return (
                        <div className="w-36">
                            <Label className="font-semibold">{row.original.brand?.name}</Label>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'averageRating',
                header: 'AVERAGE RATING',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-1">
                            <Label>{row.original.averageRating}</Label>
                            <StarIcon />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'description',
                header: 'DESCRIPTION',
                cell: ({ row }) => {
                    return (
                        <Popover
                            content={popoverComponent(row.original.description)}
                            type="hover"
                            className="w-[40rem]"
                        >
                            <p className="hover:font-semibold transition cursor-pointer text-base">SHOW</p>
                        </Popover>
                    );
                },
            },
            {
                accessorKey: 'sizeAndFit',
                header: 'SIZE AND FIT',
                cell: ({ row }) => {
                    return (
                        <Popover
                            content={popoverComponent(row.original.sizeAndFit || '')}
                            type="hover"
                            className="w-[40rem]"
                        >
                            <p className="hover:font-semibold transition cursor-pointer text-base">SHOW</p>
                        </Popover>
                    );
                },
            },
            {
                id: 'actions',
                header: 'ACTION',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <EditButton
                                className="py-1 px-2"
                                onClick={() => navigate(`/admin/product/update/${row.original.id}`)}
                            />
                            <DetailButton
                                className="py-1 px-2"
                                onClick={() => navigate(`/admin/product-item/${row.original.id}`)}
                            />
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const filterComponent = useCallback(() => {
        const categoryEndpoint = useMemo(() => '/catalog-service/api/Category/filter', []);
        const { data: categories } = useFetch<Category[]>(categoryEndpoint, null, [categoryEndpoint]);
        const brandEndpoint = useMemo(() => '/catalog-service/api/Brand', []);
        const { data: brands } = useFetch<Brand[]>(brandEndpoint, null, [brandEndpoint]);
        const genderEndpoint = useMemo(() => '/catalog-service/api/Gender', []);
        const { data: genders } = useFetch<Gender[]>(genderEndpoint, null, [genderEndpoint]);

        const handleFilterChange = useCallback((key: 'brand' | 'category' | 'gender', value: string) => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                [key]: value === 'ALL' ? '' : value,
            }));
        }, []);

        return (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Select onValueChange={(value) => handleFilterChange('gender', value)} value={filter.gender}>
                    <SelectTrigger className="w-full sm:w-[180px] filter-input">
                        <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Gender</SelectItem>
                        {genders?.map((value, index) => {
                            return (
                                <SelectItem value={value.id} key={index}>
                                    {value.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleFilterChange('category', value)} value={filter.category}>
                    <SelectTrigger className="w-full sm:w-[180px] filter-input">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Category</SelectItem>
                        {categories?.map((value, index) => {
                            return (
                                <SelectItem value={value.id} key={index}>
                                    {value.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleFilterChange('brand', value)} value={filter.brand}>
                    <SelectTrigger className="w-full sm:w-[180px] filter-input">
                        <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Brands</SelectItem>
                        {brands?.map((value, index) => {
                            return (
                                <SelectItem value={value.id} key={index}>
                                    {value.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
        );
    }, [filter]);

    const tableParams = useMemo(
        () => ({
            OrderCol: 'CreatedDate',
            OrderDir: 'desc',
            BrandId: filter.brand,
            CategoryId: filter.category,
            GenderId: filter.gender,
        }),
        [filter],
    );

    return (
        <div className="h-fit">
            <div className="flex justify-between items-center">
                <ProductBreadcrumb />
                <AddButton hoverContent="Create a new Product" onClick={() => navigate(AdminNavigate.productAdd.link)}>
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/catalog-service/api/Product/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    param={tableParams}
                    filter={filterComponent()}
                    deleteApi="/catalog-service/api/Product"
                />
            </div>
        </div>
    );
}

export default ProductManagement;
