import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { DiscountTypeEnum } from '@/enums/discount-type.enum';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import DicountBreadcrumb from './components/dicount.breadcrumb';
import AddDiscountModal from './components/add-discount.modal';
import UpdateDiscountModal from './components/update-discount.modal';
import useFetch from '@/hooks/useFetch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function DiscountManagement() {
    const { tableRef, onFetch } = useTableRef();
    const { openModal } = useModalContext();
    const [filter, setFilter] = useState({
        type: '',
    });

    const columns = useMemo<ColumnDef<Discount>[]>(
        () => [
            ColumnSelect<Discount>(),
            {
                accessorKey: 'code',
                header: 'CODE',
            },
            {
                accessorKey: 'quantity',
                header: 'QUANTITY',
            },
            {
                accessorKey: 'value',
                header: 'VALUE',
                cell: ({ row }) => {
                    const id = row.original.discountType?.id;
                    return (
                        <div>
                            {id === DiscountTypeEnum.Percentage && (
                                <div className="space-x-1 font-semibold flex justify-center text-base">
                                    <span>{row.original.value}</span>
                                    <span>%</span>
                                </div>
                            )}
                            {(id === DiscountTypeEnum.Money || id === DiscountTypeEnum.Product) && (
                                <div className="space-x-1 font-semibold flex justify-center text-base">
                                    <span>{row.original.value}</span>
                                    <span>$</span>
                                </div>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'minimum',
                header: 'MINIMUM',
                cell: ({ row }) => {
                    return (
                        <div className="space-x-1 font-semibold flex justify-center text-base">
                            <span>{row.original.minimum}</span>
                            <span>$</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'discountType.name',
                header: 'TYPE',
                cell: ({ row }) => {
                    return (
                        <div>
                            {row.original.discountType?.id == DiscountTypeEnum.Money && (
                                <Badge className="bg-green-400 text-sm">{row.original.discountType.name}</Badge>
                            )}
                            {row.original.discountType?.id == DiscountTypeEnum.Percentage && (
                                <Badge className="bg-red-400 text-sm">{row.original.discountType.name}</Badge>
                            )}
                            {row.original.discountType?.id == DiscountTypeEnum.Product && (
                                <Badge className="bg-blue-400 text-sm">{row.original.discountType.name}</Badge>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'available',
                header: 'AVAILABLE',
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center">
                            {row.original.available ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-green-600 font-semibold">Available</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                                    <span className="text-red-500">Unavailable</span>
                                </>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'startDate',
                header: 'START DATE',
                cell: ({ row }) => {
                    return <div>{dayjs(row.original.startDate).format('DD-MM-YYYY')}</div>;
                },
            },
            {
                accessorKey: 'endDate',
                header: 'END DATE',
                cell: ({ row }) => {
                    return <div>{dayjs(row.original.endDate).format('DD-MM-YYYY')}</div>;
                },
            },
            {
                id: 'actions',
                header: 'ACTION',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2 justify-center">
                            <EditButton
                                className="py-1 px-2"
                                onClick={() => openModal(ModalType.UpdateDiscount, row.original, onFetch)}
                            />
                            {/* {row.original.discountType?.id == DiscountTypeEnum.Product && (
                                <DetailButton
                                    className="py-1 px-2"
                                    onClick={() => openModal(ModalType.UpdateDiscount, row.original, onFetch)}
                                />
                            )} */}
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const filterComponent = useCallback(() => {
        const typeEndpoint = useMemo(() => '/promotion-service/api/DiscountType', []);
        const { data: types } = useFetch<DiscountType[]>(typeEndpoint, null, [typeEndpoint]);

        const handleFilterChange = useCallback((value: string) => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                ['type']: value === 'ALL' ? '' : value,
            }));
        }, []);

        return (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Select onValueChange={(value) => handleFilterChange(value)} value={filter.type}>
                    <SelectTrigger className="w-full sm:w-[180px] filter-input">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Type</SelectItem>
                        {types?.map((value, index) => {
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
            Type: filter.type,
        }),
        [filter],
    );

    return (
        <div className="h-fit">
            <AddDiscountModal />
            <UpdateDiscountModal />
            <div className="flex justify-between items-center">
                <DicountBreadcrumb />
                <AddButton
                    hoverContent="Create a new color"
                    onClick={() => openModal(ModalType.CreateDiscount, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/promotion-service/api/Discount/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    filter={filterComponent()}
                    param={tableParams}
                    deleteApi="/promotion-service/api/Discount"
                />
            </div>
        </div>
    );
}

export default DiscountManagement;
