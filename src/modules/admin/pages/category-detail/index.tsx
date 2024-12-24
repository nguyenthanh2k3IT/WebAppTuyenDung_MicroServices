import { useParams } from 'react-router-dom';
import CategoryDetailBreadcrumb from './components/category-detail.breadcrumb';
import ValidatorHelper from '@/helpers/validator.helper';
import NotFound from '@/components/error/not-found';
import { AdminNavigate } from '../../navigate';
import useFetch from '@/hooks/useFetch';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import Image from '@/components/image';
import EditButton from '@/components/button/edit.button';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import AddButton from '@/components/button/add.button';
import { DataTable } from '@/components/table/data-table';
import PageLoading from '@/components/loading/page.loading';
import AddCategoryModal from '../category-management/components/add-category.modal';
import UpdateCategoryModal from '../category-management/components/update-category.modal';
import APIEndpoint from '@/utils/api.endpoint';

function CategoryDetailPage() {
    const { id } = useParams();
    const { openModal } = useModalContext();
    const { tableRef, onFetch } = useTableRef();

    if (!id || !ValidatorHelper.isGuid(id)) {
        return <NotFound to={AdminNavigate.category.link} />;
    }

    const endpoint = useMemo(() => APIEndpoint.categoryDetail(id), [id]);
    const { data: parent, loading, succeeded } = useFetch<Category>(endpoint, null, [endpoint]);

    const columns = useMemo<ColumnDef<Category>[]>(
        () => [
            ColumnSelect<Category>(),
            {
                accessorKey: 'imageFile',
                header: 'IMAGE',
                cell: ({ row }) => {
                    return (
                        <Image src={row.original.imageFile || ''} alt={'avatar'} shape="circle" className="w-10 h-10" />
                    );
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
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const param = useMemo(() => ({ ParentId: id }), [id]);

    return (
        <div>
            <PageLoading loading={loading} />
            <AddCategoryModal />
            <UpdateCategoryModal />
            {!loading && (!parent || !succeeded) && <NotFound to={AdminNavigate.category.link} />}
            {parent && (
                <div className="h-fit">
                    <div className="flex justify-between items-center">
                        <CategoryDetailBreadcrumb name={parent.name} />
                        <AddButton
                            hoverContent="Create a new user"
                            onClick={() => openModal(ModalType.CreateCategory, id, onFetch)}
                        >
                            Create
                        </AddButton>
                    </div>
                    <div className="mt-4">
                        <DataTable
                            columns={columns}
                            api={APIEndpoint.categoryPagination}
                            param={param}
                            ref={tableRef}
                            selectKey={'id'}
                            deleteApi={APIEndpoint.categoryRoot}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryDetailPage;
