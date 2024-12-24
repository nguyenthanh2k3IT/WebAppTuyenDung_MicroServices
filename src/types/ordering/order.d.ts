type Order = {
    id: string;
    userId: string;
    discountId?: string | null;
    transactionId?: string | null;
    basePrice: number;
    discountPrice: number;
    subPrice: number;
    pointUsed: number;
    total: number;
    receiverName: string;
    email: string;
    phone: string;
    address: string;
    createdDate: string;
    statusId?: string | null;
    status?: OrderStatus | null;
};
