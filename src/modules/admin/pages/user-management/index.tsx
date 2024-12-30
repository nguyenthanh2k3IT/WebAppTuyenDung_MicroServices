import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import EditButton from '@/components/button/edit.button';
import AddButton from '@/components/button/add.button';
import Image from '@/components/image';
import { CheckCircle2, XCircle, Lock, Unlock } from 'lucide-react';
import CustomButton from '@/components/button/custom.button';
import { UserStatusType } from '@/enums/entity-type.enum';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UserManagementBreadcrumb from './components/breadcrumb';
import CreateUserModal from './components/modals/create-user.modal';
import UpdateUserModal from './components/modals/update-user.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';
import useFetch from '@/hooks/useFetch';
import { useQuery } from '@tanstack/react-query';
import RoleService from '@/services/role.service';
import { queryConfig, queryKey } from '@/constants/react-query-config';
import UserStatusService from '@/services/user-status.service';

function UserManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['banUser']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        status: '',
        role: '',
    });

    const handleOpenDialog = useCallback((id: string, status: string) => {
        openDialog('banUser', { id, status });
    }, []);

    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            ColumnSelect<User>(),
            {
                accessorKey: 'Avatar',
                header: 'AVATAR',
                cell: ({ row }) => {
                    return (
                        <Image src={row.original.avatar || ''} alt={'avatar'} shape="circle" className="w-10 h-10" />
                    );
                },
            },
            {
                accessorKey: 'fullname',
                header: 'FULLNAME',
            },
            {
                accessorKey: 'email',
                header: 'EMAIL',
            },
            {
                accessorKey: 'status.name',
                header: 'STATUS',
                cell: ({ row }) => {
                    return (
                        <div>
                            {row.original.status?.id == UserStatusType.ACTIVE && (
                                <Badge className="bg-green-400 text-sm">{row.original.status?.name}</Badge>
                            )}
                            {row.original.status?.id == UserStatusType.BANNED && (
                                <Badge className="bg-red-400 text-sm">{row.original.status?.name}</Badge>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'role.name',
                header: 'ROLE',
                cell: ({ row }) => <span className="font-bold">{row.original.role?.name}</span>,
            },
            {
                accessorKey: 'isEmailConfirmed',
                header: 'EMAIL CONFIRMED',
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center">
                            {row.original.isEmailConfirmed ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-green-600 font-semibold">Confirmed</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                                    <span className="text-red-500">Unconfirmed</span>
                                </>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'phone',
                header: 'PHONE',
                cell: ({ row }) => {
                    return row.original.phone ? <Badge>{row.original.phone}</Badge> : null;
                },
            },
            {
                id: 'actions',
                header: 'ACTION',
                cell: ({ row }) => {
                    const isActive = row.original.status?.id === UserStatusType.ACTIVE;
                    return (
                        <div className="flex space-x-2">
                            <EditButton
                                onClick={() => openModal(ModalType.UpdateUser, row.original, onFetch)}
                                className="py-1 px-2"
                            />
                            {isActive ? (
                                <CustomButton
                                    onClick={() => handleOpenDialog(row.original.id, UserStatusType.BANNED)}
                                    className="py-1 px-2 bg-black text-white hover:opacity-80"
                                    hoverContent={`Ban user`}
                                >
                                    <Lock className="w-4 h-4" />
                                </CustomButton>
                            ) : (
                                <CustomButton
                                    onClick={() => handleOpenDialog(row.original.id, UserStatusType.ACTIVE)}
                                    className="py-1 px-2 bg-green-500 text-white hover:bg-green-600"
                                    hoverContent={`Unban user`}
                                >
                                    <Unlock className="w-4 h-4" />
                                </CustomButton>
                            )}
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const filterComponent = useCallback(() => {
        const { data: roles } = useQuery<Role[], Error>({
            queryKey: [queryKey.role],
            queryFn: () => RoleService.getAll(),
            ...queryConfig,
        });
        const { data: statuses } = useQuery<UserStatus[], Error>({
            queryKey: [queryKey.userStatus],
            queryFn: () => UserStatusService.getAll(),
            ...queryConfig,
        });

        const handleFilterChange = useCallback((key: 'status' | 'role', value: string) => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                [key]: value === 'ALL' ? '' : value,
            }));
        }, []);

        return (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Select onValueChange={(value) => handleFilterChange('role', value)} value={filter.role}>
                    <SelectTrigger className="w-full sm:w-[180px] filter-input">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Tất cả</SelectItem>
                        {roles?.map((value, index) => {
                            return (
                                <SelectItem value={value.id} key={index}>
                                    {value.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleFilterChange('status', value)} value={filter.status}>
                    <SelectTrigger className="w-full sm:w-[180px] filter-input">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Tất cả</SelectItem>
                        {statuses?.map((value, index) => {
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
            ...filter,
        }),
        [filter],
    );

    const handleBanUser = useCallback(async () => {
        if (!dialogs.banUser.data) {
            toast({
                title: 'Failed',
                description: 'Update user status failed : data not found',
                variant: 'destructive',
            });
            return;
        }
        const result = await callApi('/identity-service/api/User/status', {
            method: 'PUT',
            body: {
                id: dialogs.banUser.data.id,
                status: dialogs.banUser.data.status,
            },
        });
        if (result.succeeded) {
            onFetch();
        }
    }, [dialogs.banUser.data]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.banUser.visible}
                closeModal={() => closeDialog('banUser')}
                onSubmit={handleBanUser}
            />
            <CreateUserModal />
            <UpdateUserModal />
            <div className="flex justify-between items-center">
                <UserManagementBreadcrumb />
                <AddButton
                    hoverContent="Create a new user"
                    onClick={() => openModal(ModalType.CreateUser, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    filter={filterComponent()}
                    api="/identity-service/api/User/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/identity-service/api/User"
                />
            </div>
        </div>
    );
}

export default memo(UserManagement);
