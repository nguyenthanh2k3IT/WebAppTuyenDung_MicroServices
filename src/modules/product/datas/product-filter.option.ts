export const allOption: SelectOption = { value: 'all', label: 'All' };

export const isSaleOption: SelectOption[] = [
    allOption,
    { value: 'true', label: 'In sale' },
    { value: 'false', label: 'Not in sale' },
];

export const sortOption: SelectOption[] = [
    allOption,
    { value: 'revelance', label: 'Relevance' },
    { value: 'price-high-to-low', label: 'Price high to low' },
    { value: 'price-low-to-high', label: 'Price low to high' },
    { value: 'highest-rating', label: 'Highest rating' },
];

export const priceRangeOption: SelectOption[] = [
    allOption,
    { value: 'under-100', label: 'Under 100 euro' },
    { value: '100-to-500', label: '100-500 euro' },
    { value: '500-1000', label: '500-1000 euro' },
    { value: 'over-1000', label: 'Over 1000 euro' },
];
