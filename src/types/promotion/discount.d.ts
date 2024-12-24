type Discount = {
    id: string;
    startDate: Date;
    endDate: Date;
    code: string;
    condition: string;
    quantity: number;
    available: boolean;
    value: number;
    minimum: number;
    discountTypeId?: string | null;
    discountType?: DiscountType | null;
    discountProducts?: string[] | null;
};
