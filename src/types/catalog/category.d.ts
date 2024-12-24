type Category = {
    id: string;
    slug: string;
    name: string;
    description?: string | undefined;
    imageFile?: string | undefined;
    parentId?: string | null;
};

type CategoryViewDto = {
    id: string;
    slug: string;
    name: string;
    selected: boolean;
};
