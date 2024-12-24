import { API } from '@/utils/axios';

export default class PaymentService {
    static async checkout(
        email: string,
        receiverName: string,
        phone: string,
        address: string,
    ): Promise<ApiRes<string>> {
        try {
            const res = await API.post('/ordering-service/api/Payment/checkout-url', {
                receiverName,
                email,
                phone,
                address,
            });
            const obj: ApiRes<string> = res.data;
            if (obj.succeeded && obj.data) {
                window.location.href = obj.data;
            }
            return obj;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            const obj: ApiRes<string> = {
                succeeded: false,
                errorMessage: 'Something went wrong, please try again!',
                data: null,
            };
            return obj;
        }
    }
}
