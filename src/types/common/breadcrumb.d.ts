type BreadcrumbItem = {
    title: string;
    link: string;
    parent?: string;
    sidebar?: boolean;
};

type NavigateType = {
    [key: string]: BreadcrumbItem;
};
