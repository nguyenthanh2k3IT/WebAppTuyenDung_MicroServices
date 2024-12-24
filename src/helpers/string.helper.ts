import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

interface UseDateFormatProps {
    date: string | Date;
    format?: string;
}

export function dateFormat({ date, format = 'YYYY-MM-DD' }: UseDateFormatProps): dayjs.Dayjs {
    return dayjs(date, format);
}

export function randomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
