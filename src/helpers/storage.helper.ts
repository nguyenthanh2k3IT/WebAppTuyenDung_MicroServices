import { clearProfileAction, setProfileAction } from '@/redux/slicers/profile.slice';
import { reduxStore } from '@/redux/store';
import Cookies from 'js-cookie';
import { asosCookies } from '@/constants/cookies';

function formatDate(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}_${pad(date.getHours())}:${pad(
        date.getMinutes(),
    )}:${pad(date.getSeconds())}`;
}

export function getToken(): string | undefined {
    const cookie = Cookies.get(asosCookies.accessToken);
    return cookie ? cookie.split(' ')[0] : undefined;
}

export function getRefreshToken(): string | undefined {
    return Cookies.get(asosCookies.refreshToken);
}

export function checkLogin(): boolean {
    const accessToken = getToken();
    const refreshToken = getRefreshToken();
    if (!accessToken && !refreshToken) {
        return false;
    }
    return true;
}

export function getAccessTokenExpireTime(): Date | null {
    const cookie = Cookies.get(asosCookies.accessToken);
    if (!cookie) return null;

    const expireTimeString = cookie.split(' ')[1];
    if (!expireTimeString) return null;

    const [datePart, timePart] = expireTimeString.split('_');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds);
}

export function setToken(data: Authentication) {
    if (data.user) {
        reduxStore.dispatch(setProfileAction(data.user));
    }

    if (data.token.accessToken && data.token.refreshToken) {
        const accessTokenExpires = new Date(data.token.accessTokenValidTo);
        const refreshTokenExpires = new Date(data.token.refreshTokenValidTo);

        const formattedAccessTokenExpires = formatDate(accessTokenExpires);
        const accessTokenValue = `${data.token.accessToken} ${formattedAccessTokenExpires}`;

        Cookies.set(asosCookies.accessToken, accessTokenValue, { expires: accessTokenExpires });
        Cookies.set(asosCookies.refreshToken, data.token.refreshToken, { expires: refreshTokenExpires });
    }
}

export function removeTokens() {
    reduxStore.dispatch(clearProfileAction());
    Cookies.remove(asosCookies.accessToken);
    Cookies.remove(asosCookies.refreshToken);
}
