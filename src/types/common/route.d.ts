type Route = {
    path: string;
    title?: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
    middleware?: ComponentType<any> | null;
};
