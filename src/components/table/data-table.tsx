'use client';
import React, { memo } from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getSortedRowModel,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ClipLoader } from 'react-spinners';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isEmpty } from '@/helpers/object.helper';
import { TablePagination } from './pagination';
//import useFetch from '@/hooks/useFetch';
import { randomString } from '@/helpers/string.helper';
import DeleteDialog from '../dialog/delete.dialog';
import { API } from '@/utils/axios';
import { useToast } from '@/components/ui/use-toast';
import NotFound from '@/assets/svg/not-found.svg';
import { Label } from '../ui/label';
import Flex from '../container/flex.container';
import DeleteButton from '../button/delete.button';
import useProfile from '@/hooks/useProfile';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    dataTable?: TData[] | null;
    searchCol?: string | null;
    selectKey?: string | null;
    deleteApi?: string;
    api?: string;
    param?: object;
    dependency?: any[];
    filter?: React.ReactNode;
}

interface DataTableRef {
    onFetch: () => void;
}

const initialDefaultParam = {
    PageIndex: 1,
    PageSize: 10,
    TextSearch: '',
    OrderCol: 'CreatedDate',
    OrderDir: 'desc',
};

const DataTableComponent = React.forwardRef<DataTableRef, DataTableProps<any, any>>(function DataTable<TData, TValue>(
    {
        filter,
        columns,
        dataTable = null,
        searchCol = null,
        api,
        deleteApi,
        param,
        selectKey = null,
        dependency = [],
    }: DataTableProps<TData, TValue>,
    ref: React.Ref<{ onFetch: () => void }>,
) {
    const queryClient = useQueryClient();
    const { profile } = useProfile();
    const { toast } = useToast();
    const [deleteId, setDeleteId] = React.useState<any[]>([]);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [fetch, setFetch] = React.useState<string>('');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [searchInput, setSearchInput] = React.useState<string>('');
    const [defaultParam, setDefaultParam] = React.useState(() => {
        return { ...initialDefaultParam, ...param };
    });

    const getPaginateData = async (
        endpoint: string | undefined,
        params?: any,
    ): Promise<PaginatedData<TData> | null> => {
        try {
            if (!endpoint) return null;
            const res = await API.get<ApiRes<PaginatedData<TData>>>(endpoint, { params });
            const data = res.data;
            return data.data;
        } catch (error) {
            return null;
        }
    };

    React.useEffect(() => {
        const key = selectKey;
        const empty = isEmpty(rowSelection);
        if (empty) {
            setDeleteId([]);
        } else if (data && api && key) {
            const items = Object.keys(rowSelection)
                .map((index) => {
                    const element = data[parseInt(index)];
                    if (element && typeof element === 'object' && key in element) {
                        return (element as Record<string, any>)[key];
                    }
                    return undefined;
                })
                .filter((item) => item !== undefined);

            setDeleteId(items);
        }
    }, [rowSelection]);

    React.useEffect(() => {
        if (param) {
            setDefaultParam((prevDefaultParam) => ({
                ...prevDefaultParam,
                ...param,
            }));
        }
    }, [param]);

    // const { data: paginate, loading } =
    //     !!api && !dataTable
    //         ? useFetch<PaginatedData<TData>>(api, { ...defaultParam }, [defaultParam, fetch, ...dependency])
    //         : { data: null, loading: false };

    const { data: paginate, isLoading: loading } = useQuery<PaginatedData<TData> | null>({
        queryKey: [api || fetch, defaultParam, ...dependency],
        queryFn: () => getPaginateData(api, defaultParam),
        staleTime: 1000 * 10, // 10 giây
        refetchOnWindowFocus: false,
    });

    const data = React.useMemo(() => {
        return dataTable ? dataTable : paginate?.items || [];
    }, [dataTable, paginate]);

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const [searchColumn] = React.useState(() => {
        const defaultColumn = Object.keys(table.getAllColumns())[1];
        if (!searchCol) return defaultColumn;

        const foundCol = table.getColumn(searchCol);
        return foundCol ? searchCol : defaultColumn;
    });

    const changePageSize = (size: number) => {
        setDefaultParam((prevDefaultParam) => ({
            ...prevDefaultParam,
            PageSize: size,
        }));
    };

    const changePageIndex = (index: number) => {
        setDefaultParam((prevDefaultParam) => ({
            ...prevDefaultParam,
            PageIndex: index,
        }));
    };

    const onFetch = () => {
        queryClient.invalidateQueries({
            queryKey: [api || fetch, defaultParam, ...dependency],
            exact: true,
        });
        const text = randomString(12);
        setFetch(text);
        setRowSelection({});
    };

    React.useImperativeHandle(ref, () => ({
        onFetch,
    }));

    const handleDelete = async () => {
        try {
            if (deleteApi && deleteId) {
                const payload: DeletePayload = {
                    ids: deleteId,
                    applicationUserId: profile?.id,
                };
                const { data: response } = await API.delete(deleteApi, {
                    data: payload,
                });
                if (!response.succeeded) {
                    toast({
                        variant: 'destructive',
                        title: 'Delete alert',
                        description: response.errorMessage,
                        duration: 1500,
                    });
                } else {
                    toast({
                        variant: 'success',
                        title: 'Delete alert',
                        description: `${deleteId.length} rows deleted successfully`,
                        duration: 1500,
                    });
                    onFetch();
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setVisible(false);
        }
    };

    const handleChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSearchInput(text);
        if (text === '') {
            setDefaultParam((prevDefaultParam) => ({
                ...prevDefaultParam,
                TextSearch: text,
            }));
        }
    };

    return (
        <div className="w-full bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg">
            <DeleteDialog visible={visible} closeModal={() => setVisible(false)} onSubmit={handleDelete} />
            <div className="flex flex-col space-y-4 mb-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                        {!!api && !dataTable ? (
                            <Input
                                placeholder="Enter search keywords ..."
                                value={searchInput}
                                onChange={(event) => handleChangeSearchInput(event)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        setDefaultParam((prevDefaultParam) => ({
                                            ...prevDefaultParam,
                                            TextSearch: searchInput,
                                        }));
                                    }
                                }}
                                className="w-full sm:w-64 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                            />
                        ) : (
                            <Input
                                placeholder="Enter search keywords ..."
                                value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''}
                                onChange={(event) => {
                                    const column = table.getColumn(searchColumn);
                                    if (column) {
                                        column.setFilterValue(event.target.value);
                                    }
                                }}
                                className="w-full sm:w-64 bg-gray-50 dark:bg-gray-700"
                            />
                        )}
                        {filter}
                    </div>
                    <div className="flex items-center space-x-2 w-full lg:w-auto justify-end">
                        {!isEmpty(rowSelection) && <DeleteButton className="mr-2" onClick={() => setVisible(true)} />}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                >
                                    Columns
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-gray-50 dark:bg-gray-800">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-700"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center py-2">
                                    <ClipLoader
                                        color={'#4745d3'}
                                        loading={loading}
                                        size={40}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row, index) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && 'selected'}
                                            className={`
                                                ${
                                                    index % 2 === 0
                                                        ? 'bg-white dark:bg-gray-900'
                                                        : 'bg-gray-50 dark:bg-gray-800'
                                                }
                                                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                                            `}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={cell.id}
                                                    className="px-4 py-2 text-gray-700 dark:text-gray-300"
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            <Flex align="center" direction="column">
                                                <img src={NotFound} alt="Logo" className="h-32 mb-4" />
                                                <Label className="text-gray-500 dark:text-gray-400">
                                                    No data available
                                                </Label>
                                            </Flex>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="py-4">
                <TablePagination
                    table={table}
                    paginate={paginate}
                    changePageSize={changePageSize}
                    changePageIndex={changePageIndex}
                />
            </div>
        </div>
    );
});

export const DataTable = memo(DataTableComponent);
