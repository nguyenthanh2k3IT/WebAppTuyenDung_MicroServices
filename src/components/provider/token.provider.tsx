import { getAccessTokenExpireTime, getRefreshToken, getToken, removeTokens, setToken } from '@/helpers/storage.helper';
import { ChildNode } from '@/types/common/layout';
import { useEffect } from 'react';
import useCaller from '@/hooks/useCaller';
import { asosCookies } from '@/constants/cookies';

const TokenProvider: React.FC<ChildNode> = ({ children }) => {
    const { callApi } = useCaller<Authentication>();

    useEffect(() => {
        const timer = setInterval(async () => {
            const accessToken = getToken();
            const refreshToken = getRefreshToken();

            if (!accessToken && !refreshToken) {
                return;
            }

            if (accessToken) {
                const accessTokenExpireTime = getAccessTokenExpireTime();
                if (accessTokenExpireTime) {
                    const currentTime = new Date();
                    const timeDifference = accessTokenExpireTime.getTime() - currentTime.getTime();
                    const tenMinutesInMilliseconds = asosCookies.refreshTime * 60 * 1000;

                    if (timeDifference < tenMinutesInMilliseconds && timeDifference > 0 && refreshToken) {
                        await handleRefreshToken(refreshToken);
                    }
                }
            }

            if (!accessToken && refreshToken) {
                await handleRefreshToken(refreshToken);
            }
        }, asosCookies.refreshInterval);

        return () => clearInterval(timer);
    }, []);

    const handleRefreshToken = async (refreshToken: string) => {
        const result = await callApi(
            '/identity-service/api/Auth/refresh-token',
            {
                method: 'POST',
                body: refreshToken,
            },
            '',
            false,
        );

        if (!result.succeeded) {
            removeTokens();
            return null;
        }

        if (result.data) {
            setToken(result.data);
        }
        return result.data;
    };

    return children;
};

export default TokenProvider;
