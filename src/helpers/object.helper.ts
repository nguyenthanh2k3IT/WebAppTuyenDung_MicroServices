export function isEmpty(input: unknown): boolean {
    if (input === null || input === undefined) return true;

    if (typeof input === 'boolean') return false;

    if (typeof input === 'number') return isNaN(input);

    if (typeof input === 'string') return input.trim().length === 0;

    if (Array.isArray(input)) return input.length === 0;

    if (typeof input === 'object') return Object.keys(input).length === 0;

    return false;
}

export function buildNavigationArray(navigate: NavigateType, currentItem: BreadcrumbItem | null): BreadcrumbItem[] {
    const result: BreadcrumbItem[] = [];

    while (currentItem) {
        result.unshift(currentItem);
        if (currentItem.parent) {
            currentItem = navigate[currentItem.parent];
        } else {
            currentItem = null;
        }
    }

    return result;
}
