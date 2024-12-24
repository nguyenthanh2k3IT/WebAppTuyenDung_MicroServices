import React, { useState, useEffect } from 'react';
import DrawerContainer from '@/components/container/drawer.container';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useCaller from '@/hooks/useCaller';
import { orderColors } from '@/modules/admin/pages/order-management/constants/order.color';
import Empty from '@/assets/svg/not-found.svg';
import dayjs from 'dayjs';

const OrderHistoryModal: React.FC = () => {
    const { callApi } = useCaller<any>();
    const [data, setData] = useState<OrderHistory[]>([]);
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.OrderHistory];

    useEffect(() => {
        const getData = async () => {
            const { data } = await callApi(
                `/ordering-service/api/Order/${modalState.data}/history`,
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                setData(data);
            }
        };

        if (modalState && modalState.visible && modalState.data) {
            getData();
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    return (
        <DrawerContainer
            title="Order History"
            open={modalState.visible}
            onClose={() => closeModal(ModalType.OrderHistory)}
        >
            <div className="px-1 md:w-[500px] sm:w-full">
                <div className="h-[500px] w-full rounded-md border p-4 overflow-y-auto custom-scrollbar">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm bg-white">
                                <p className="font-semibold text-black">Order ID: {item.orderId}</p>
                                <p className="text-gray-800 mb-1">User: Admin</p>
                                <p className="text-gray-800 mb-1">
                                    <span className="mr-2">Status:</span>
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-white text-xs font-medium mr-2 ${
                                            orderColors[item.fromStatus]
                                        }`}
                                    >
                                        {item.fromStatus}
                                    </span>
                                    →
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-white text-xs font-medium ml-2 ${
                                            orderColors[item.toStatus]
                                        }`}
                                    >
                                        {item.toStatus}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    At: {dayjs(item.createdDate).format('DD/MM/YYYY HH:mm:ss')}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div>
                            <img src={Empty} alt="empty" />
                        </div>
                    )}
                </div>
            </div>
        </DrawerContainer>
    );
};

export default OrderHistoryModal;
