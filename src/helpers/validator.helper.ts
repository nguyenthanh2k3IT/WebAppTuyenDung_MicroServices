export default class ValidatorHelper {
    static isNotNullOrUndefined<T extends Record<string, unknown>>(data: T, ignores: string[] = []): string | null {
        let invalid: string | null = null;
        Object.entries(data).forEach(([key, value]) => {
            if (!ignores.includes(key) && (value === null || value === undefined || value === '')) {
                invalid = key;
            }
        });

        return invalid;
    }

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        return true;
    }

    static isValidPhone(phone: string): boolean {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return false;
        }
        return true;
    }

    static isValidSlug(slug: string): boolean {
        const slugRegex = /^[a-z0-9-]+$/;
        return slugRegex.test(slug);
    }

    static isGuid(s: string): boolean {
        const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        return guidPattern.test(s);
    }
}
