import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import useDialog from '@/hooks/useDialog';
import PointHistorySkeleton from '../components/skeletons/point-history.skeleton';
import DeleteDialog from '@/components/dialog/delete.dialog';
import ExpandableList from '@/components/list/expandable.list';
import useExpandableListRef from '@/hooks/useExpandableListRef';

function PointHistoryPage() {
    const { listRef, handleRemove } = useExpandableListRef();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteConfirm']);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleOpenDialog = (id: string) => {
        setSelectedId(id);
        openDialog('deleteConfirm');
    };

    const confirmDelete = () => {
        if (selectedId) {
            closeDialog('deleteConfirm');
            setSelectedId(null);
            handleRemove(selectedId);
        }
    };

    const PointContent = (item: Point) => {
        return (
            <Card key={item.id} className="relative mb-4">
                <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <span
                                className={`text-lg font-semibold ${
                                    item.pointChange > 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {item.pointChange > 0 ? `+${item.pointChange}` : item.pointChange} points
                            </span>
                            <p className="text-sm text-gray-600">{item.reason}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(item.id)}
                            className="absolute top-2 right-2"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500 absolute bottom-2 right-2">{item.createdDate}</p>
                </CardContent>
            </Card>
        );
    };

    const Skeleton = () => {
        return <PointHistorySkeleton />;
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">POINT HISTORY</h2>
            <p className="text-gray-600 mb-2 text-sm">View your point history and manage your rewards.</p>
            <ExpandableList
                ref={listRef}
                api="/identity-service/api/PointHistory/filter"
                content={PointContent}
                skeleton={Skeleton()}
                totalRecord={4}
            />
            <DeleteDialog
                visible={dialogs.deleteConfirm.visible}
                closeModal={() => closeDialog('deleteConfirm')}
                onSubmit={confirmDelete}
            />
        </div>
    );
}

export default PointHistoryPage;
