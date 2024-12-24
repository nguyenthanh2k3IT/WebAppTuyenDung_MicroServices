type ProductComment = {
    id: string;
    content: string;
    parentId?: string | null;
    productId: string | null;
    user: UserComment;
};

type UserComment = {
    id: string;
    email: string;
    fullname: string;
    avatar: string;
};
