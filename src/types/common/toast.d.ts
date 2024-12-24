type ToastOptions = {
    type: ToastType;
    messages: string[];
};

type ToastType = 'success' | 'info' | 'warning' | 'error';
