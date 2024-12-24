type Gender = {
    id: string;
    name: string;
    description: string;
    slug: string;
};

type GenderMenu = {
    id: string;
    slug: string;
    name: string;
    categories: CategoryInGender[];
};

type CategoryInGender = {
    id: string;
    slug: string;
    name: string;
    parentId?: string | null;
    children: CategoryInGender[];
};
