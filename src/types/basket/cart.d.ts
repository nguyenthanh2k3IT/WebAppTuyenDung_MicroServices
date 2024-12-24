type Cart = {
    userId: string;
    basePrice: number;
    discountPrice: number;
    discount?: CartDiscount;
    subPrice: number;
    pointUsed: number;
    total: number;
    items: CartItem[];
};

type CartItem = {
    productId: string;
    productItemId: string;
    variationId: string;
    slug: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    size: string;
    color: string;
    originalPrice: number;
    salePrice: number;
    additionalPrice: number;
    stock: number;
    isSale: boolean;
    quantity: number;
    totalPrice: number;
    totalSalePrice: number;
    image: string;
};

type CartDiscount = {
    id: string;
    code: string;
    value: number;
    discountTypeId: string;
};
