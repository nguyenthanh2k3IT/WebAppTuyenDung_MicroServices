import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import Image from '@/components/image';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import CategoryBreadcrumb from './components/category.breadcrumb';
import DetailButton from '@/components/button/detail.button';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from './components/add-category.modal';
import UpdateCategoryModal from './components/update-category.modal';

function CategoryManagement() {
    const { tableRef, onFetch } = useTableRef();
    const { openModal } = useModalContext();
    const navigate = useNavigate();

    const columns = useMemo<ColumnDef<Category>[]>(
        () => [
            ColumnSelect<Category>(),
            {
                accessorKey: 'imageFile',
                header: 'IMAGE',
                cell: ({ row }) => {
                    return <Image src={row.original.imageFile} alt={'avatar'} shape="circle" className="w-10 h-10" />;
                },
            },
            {
                accessorKey: 'slug',
                header: 'SLUG',
            },
            {
                accessorKey: 'name',
                header: 'NAME',
            },
            {
                id: 'actions',
                header: 'ACTION',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <EditButton
                                className="py-1 px-2"
                                onClick={() => openModal(ModalType.UpdateCategory, row.original, onFetch)}
                            />
                            <DetailButton
                                className="py-1 px-2"
                                onClick={() => navigate(`/admin/category/detail/${row.original.id}`)}
                            />
                        </div>
                    );
                },
            },
        ],
        [],
    );

    return (
        <div className="h-fit">
            <AddCategoryModal />
            <UpdateCategoryModal />
            <div className="flex justify-between items-center">
                <CategoryBreadcrumb />
                <AddButton
                    hoverContent="Create a new user"
                    onClick={() => openModal(ModalType.CreateCategory, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/catalog-service/api/Category/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/catalog-service/api/Category"
                />
            </div>
        </div>
    );
}

export default CategoryManagement;
