export const AdminNavigate: NavigateType = {
    login: {
        title: 'Login Admin',
        link: '/admin/login',
        sidebar: false,
    },
    dashboard: {
        title: 'Dashboard',
        link: '/admin/dashboard',
        sidebar: true,
    },
    user: {
        title: 'User Management',
        link: '/admin/user',
        sidebar: true,
    },
    product: {
        title: 'Product Management',
        link: '/admin/product',
        sidebar: true,
    },
    productEdit: {
        title: 'Update Product',
        link: '/admin/product/update/:id',
        sidebar: false,
    },
    productAdd: {
        title: 'Create Product',
        link: '/admin/product/add',
        sidebar: false,
    },
    productItem: {
        title: 'Product Item Management',
        link: '/admin/product-item/:id',
        sidebar: false,
    },
    variation: {
        title: 'Variation Management',
        link: '/admin/variation/:id',
        sidebar: false,
    },
    category: {
        title: 'Category Management',
        link: '/admin/category',
        sidebar: true,
    },
    categoryDetail: {
        title: 'Category Detail',
        link: '/admin/category/detail/:id',
        sidebar: false,
    },
    brand: {
        title: 'Brand Management',
        link: '/admin/brand',
        sidebar: true,
    },
    color: {
        title: 'Color Management',
        link: '/admin/color',
        sidebar: true,
    },
    size: {
        title: 'Size Management',
        link: '/admin/size',
        sidebar: true,
    },
    order: {
        title: 'Order Management',
        link: '/admin/order',
        sidebar: true,
    },
    orderItem: {
        title: 'Order Item Management',
        link: '/admin/order/:id',
        sidebar: false,
    },
    discount: {
        title: 'Discount Management',
        link: '/admin/discount',
        sidebar: true,
    },
};
