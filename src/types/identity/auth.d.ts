type Token = {
    accessToken: string;
    refreshToken: string;
    accessTokenValidTo: Date;
    refreshTokenValidTo: Date;
};

type Authentication = {
    token: Token;
    user: Profile;
};
