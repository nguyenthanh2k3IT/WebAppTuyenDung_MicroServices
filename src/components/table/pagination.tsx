import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TablePaginationProps<TData> {
    table: Table<TData>;
    paginate?: PaginatedData<TData> | null;
    changePageSize?: (size: number) => void;
    changePageIndex?: (index: number) => void;
}

export function TablePagination<TData>({
    table,
    changePageSize,
    changePageIndex,
    paginate = null,
}: TablePaginationProps<TData>) {
    const handleChangePageSize = (value: string) => {
        const size = Number(value);
        if (changePageSize) changePageSize(size);
        else table.setPageSize(size);
        handleFirstPage();
    };

    const handleFirstPage = () => {
        if (changePageIndex) changePageIndex(1);
        else table.setPageIndex(0);
    };

    const handleLastPage = () => {
        if (changePageIndex && paginate) changePageIndex(paginate?.totalPages);
        else table.setPageIndex(table.getPageCount() - 1);
    };

    const handlePreviousPage = () => {
        if (changePageIndex && paginate) {
            const previous = paginate?.pageIndex - 1;
            changePageIndex(previous);
        } else table.previousPage();
    };

    const handleNextPage = () => {
        if (changePageIndex && paginate) {
            const next = paginate?.pageIndex + 1;
            changePageIndex(next);
        } else table.nextPage();
    };

    const getPages = () => {
        const pages = [];

        if (!paginate) return [];

        const total = paginate.totalPages;
        const index = paginate.pageIndex;

        if (total <= 3) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (index === 1) {
                pages.push(1, 2, 3);
            } else if (index === total) {
                pages.push(total - 2, total - 1, total);
            } else {
                pages.push(index - 1, index, index + 1);
            }
        }

        return pages;
    };

    const handleChangePageIndex = (page: number) => {
        if (changePageIndex) changePageIndex(page);
        else table.setPageIndex(page);
    };

    const getButtonStyle = (page: number) => {
        if (paginate) {
            if (paginate.pageIndex === page) {
                return 'dark:bg-white dark:text-black bg-black text-white hover:bg-black! hover:text-white';
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4 space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                selected.
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 order-1 sm:order-2">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={paginate ? `${paginate.pageSize}` : `${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => handleChangePageSize(value)}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">
                        {paginate
                            ? `Page ${paginate.pageIndex} of ${paginate.totalPages}`
                            : `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
                    </p>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={handleFirstPage}
                            disabled={paginate ? !paginate.hasPreviousPage : !table.getCanPreviousPage()}
                        >
                            <DoubleArrowLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={handlePreviousPage}
                            disabled={paginate ? !paginate.hasPreviousPage : !table.getCanPreviousPage()}
                        >
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        {getPages().map((page, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className={`h-8 w-8 p-0 ${getButtonStyle(page)}`}
                                onClick={() => handleChangePageIndex(page)}
                            >
                                <span>{page}</span>
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={handleNextPage}
                            disabled={paginate ? !paginate.hasNextPage : !table.getCanNextPage()}
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={handleLastPage}
                            disabled={paginate ? !paginate.hasNextPage : !table.getCanNextPage()}
                        >
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
