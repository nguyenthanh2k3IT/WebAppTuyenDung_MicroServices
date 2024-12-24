type Variation = {
    id: string;
    qtyDisplay: number;
    qtyInStock: number;
    stock: number;
    productItemId: string | null;
    sizeId: string | null;
    size: Size | null;
};

type VariationDetail = {
    id: string;
    qtyDisplay: number;
    qtyInStock: number;
    stock: number;
    size: string;
};
