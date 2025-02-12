import { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import CustomButton from '@/components/button/custom.button';
import JobManagementBreadcrumb from './components/breadcrumb';
import useModalContext from '@/hooks/useModal';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';

function JobManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteJob']);
    const [filter, setFilter] = useState({
        name: '',
    });
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        const result = await callApi('job-service/api/Job?PageIndex=1&PageSize=10', {
            method: 'GET',
        });
        if (result) {
            setJobs(result.items);
        }
        setLoading(false);
    }, [callApi]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteJob', { id });
    }, [openDialog]);

    const handleDeleteJob = useCallback(async () => {
        if (!dialogs.deleteJob.data) {
            toast({
                title: 'Failed',
                description: 'Xóa công việc thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteJob.data.id],
        };
        const result = await callApi('/job-service/api/Job', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            fetchJobs();
        }
    }, [dialogs.deleteJob.data, callApi, fetchJobs, toast]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteJob.visible}
                closeModal={() => closeDialog('deleteJob')}
                onSubmit={handleDeleteJob}
            />
            <div className="flex justify-between items-center">
                <JobManagementBreadcrumb />
            </div>
            <div className="mt-4">
                
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Slug</th>
                                <th className="py-2">Tên công việc</th>
                                <th className="py-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td className="border px-4 py-2">{job.slug}</td>
                                    <td className="border px-4 py-2">{job.name}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex space-x-2">
                                            <CustomButton
                                                onClick={() => handleOpenDialog(job.id)}
                                                className="py-1 px-2 bg-red-500 text-white hover:bg-red-600"
                                                hoverContent={`Delete job`}
                                            >
                                                Xóa
                                            </CustomButton>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    );
}

export default memo(JobManagement);