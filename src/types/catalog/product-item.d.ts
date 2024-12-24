type ProductItem = {
    id: string;
    productId: string;
    colorId: string;
    color: Color | null;
    additionalPrice: number;
    images: ProductImage[];
    items: ProductItemDetail[];
};

type ProductItemDetail = {
    id: string;
    color: string;
    additionalPrice: number;
    images: string[];
    variations: VariationDetail[];
};
