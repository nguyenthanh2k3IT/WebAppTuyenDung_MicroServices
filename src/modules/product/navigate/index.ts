export const ProductNavigate: NavigateType = {
    product: {
        title: 'Sản phẩm',
        link: '/product',
    },
    detail: {
        title: 'Chi tiết sản phẩm',
        link: '/product/:slug',
        parent: 'product',
    },
};
