type Product = {
    id: string;
    slug: string;
    name: string;
    description: string;
    averageRating: number;
    sizeAndFit: string | null;
    image: string | null;
    bought: number | null;
    originalPrice: number;
    salePrice: number;
    isSale: boolean;
    categoryId: string | null;
    category: Category | null;
    brandId: string | null;
    brand: Brand | null;
    genderId: string | null;
    gender: Gender | null;
};

type ProductOverview = {
    id: string;
    slug: string;
    name: string;
    image: string;
    averageRating: number;
    bought?: number;
    originalPrice: number;
    salePrice: number;
    isSale: boolean;
    category?: string;
    brand?: string;
};

type ProductDetail = {
    id: string;
    slug: string;
    name: string;
    description: string;
    averageRating: number;
    sizeAndFit: string | null;
    image: string | null;
    originalPrice: number;
    salePrice: number;
    isSale: boolean;
    category?: string;
    brand?: string;
    items: ProductItemDetail[];
    action: ProductDetailAction;
};

type ProductDetailAction = {
    bought: boolean;
    addWishlist: boolean;
    rated: boolean;
    pointRated: number;
};
