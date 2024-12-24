export default class APIEndpoint {
    static categoryRoot: string = '/catalog-service/api/Category';
    static categoryFilter: string = '/catalog-service/api/Category/filter';
    static categoryPagination: string = '/catalog-service/api/Category/pagination';
    static categoryDetail = (id: string): string => {
        return `/catalog-service/api/Category/${id}`;
    };
    static categoryByGender = (id: string): string => {
        return `/catalog-service/api/Category/gender/${id}`;
    };
    static categoryByGenderSlug = (slug: string): string => {
        return `/catalog-service/api/Category/gender/slug/${slug}`;
    };

    static genderRoot: string = '/catalog-service/api/Gender';
    static genderFilter: string = '/catalog-service/api/Gender/filter';
    static genderPagination: string = '/catalog-service/api/Gender/pagination';
    static genderDetail = (id: string): string => {
        return `/catalog-service/api/Gender/${id}`;
    };

    static brandRoot: string = '/catalog-service/api/Brand';
    static brandFilter: string = '/catalog-service/api/Brand/filter';
    static brandPagination: string = '/catalog-service/api/Brand/pagination';
    static brandDetail = (id: string): string => {
        return `/catalog-service/api/Brand/${id}`;
    };

    static productRoot: string = '/catalog-service/api/Product';
    static productFilter: string = '/catalog-service/api/Product/filter';
    static productPagination: string = '/catalog-service/api/Product/pagination';
    static productOverview: string = '/catalog-service/api/Product/pagination-overview';
    static productDetail = (id: string): string => {
        return `/catalog-service/api/Product/${id}`;
    };
    static productFullInfo = (slug: string): string => {
        return `/catalog-service/api/Product/detail/${slug}`;
    };
    static productGetByItem = (id: string): string => {
        return `/catalog-service/api/Product/item/${id}`;
    };
    static productSimilar = (slug: string, take: number): string => {
        return `/catalog-service/api/Product/similar/${slug}?take=${take}`;
    };

    static productItemRoot: string = '/catalog-service/api/ProductItem';
    static productItemFilter: string = '/catalog-service/api/ProductItem/filter';
    static productItemPagination: string = '/catalog-service/api/ProductItem/pagination';
    static productItemDetail = (id: string): string => {
        return `/catalog-service/api/ProductItem/${id}`;
    };

    static commentRoot: string = '/catalog-service/api/Comment';
    static commentFilter: string = '/catalog-service/api/Comment/filter';
    static commentPagination: string = '/catalog-service/api/Comment/pagination';
    static commentProduct = (id: string): string => {
        return `/catalog-service/api/Comment/product/${id}`;
    };
    static commentDetail = (id: string): string => {
        return `/catalog-service/api/Comment/${id}`;
    };

    static wishlistRoot: string = '/catalog-service/api/Wishlist';
    static wishlistFilter: string = '/catalog-service/api/Wishlist/filter';
    static wishlistPagination: string = '/catalog-service/api/Wishlist/pagination';
    static wishlistDelete = (id: string): string => {
        return `/catalog-service/api/Wishlist/product/${id}`;
    };

    static cartRoot: string = '/basket-service/api/Cart';
    static cartPagination: string = '/basket-service/api/Cart/pagination';
    static cartAddProduct = (id: string): string => {
        return `/basket-service/api/Cart/add-product/${id}`;
    };
    static cartRemoveProduct = (id: string): string => {
        return `/basket-service/api/Cart/remove-product/${id}`;
    };
    static increaseQuantity = (id: string): string => {
        return `/basket-service/api/Cart/increase-quantity/${id}`;
    };
    static decreaseQuantity = (id: string): string => {
        return `/basket-service/api/Cart/decrease-quantity/${id}`;
    };
    static applyDiscount = (code: string): string => {
        return `/basket-service/api/Cart/apply-discount/${code}`;
    };
    static removeDiscount = (code: string): string => {
        return `/basket-service/api/Cart/remove-discount/${code}`;
    };
    static applyPoint = (point: string): string => {
        return `/basket-service/api/Cart/apply-point/${point}`;
    };
    static removePoint = (): string => {
        return `/basket-service/api/Cart/remove-point`;
    };
}
