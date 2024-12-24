export const orderColors: Record<string, string> = {
    Pending: 'bg-yellow-300 hover:bg-yellow-400 !text-black',
    Placed: 'bg-orange-300 hover:bg-orange-400 !text-black',
    Packed: 'bg-indigo-400 hover:bg-indigo-500',
    Shipping: 'bg-teal-400 hover:bg-teal-500',
    Completed: 'bg-green-400 hover:bg-green-500',
    Refunded: 'bg-red-400 hover:bg-red-500',
    Canceled: 'bg-gray-400 hover:bg-gray-500',
    None: 'hidden',
};
