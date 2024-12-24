type User = {
    id: string;
    email: string;
    phone: string;
    fullname: string;
    address: string;
    avatar: string | null;
    isEmailConfirmed: boolean;
    banReason: string | null;
    status: UserStatus | null;
    role: Role | null;
};
