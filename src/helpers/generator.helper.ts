export default class GeneratorHelper {
    static newGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    static getSlug(s: string): string {
        return s
            .toLowerCase() // Chuyển về chữ thường
            .normalize('NFD') // Chuẩn hóa để tách dấu (dành cho Unicode)
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
            .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ các ký tự đặc biệt (ngoại trừ khoảng trắng và '-')
            .trim() // Loại bỏ khoảng trắng đầu và cuối chuỗi
            .replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu '-'
    }
}
