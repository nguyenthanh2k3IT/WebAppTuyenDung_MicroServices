import Success from '@/assets/images/checkout-success.png';
import { Link } from 'react-router-dom';

function CheckoutSuccessPage() {
    return (
        <div className="max-w-3xl mx-auto h-screen flex flex-col">
            <img src={Success} alt="success" className="mt-20" />
            <h2 className="text-center text-green-600 text-3xl uppercase font-bold">Congratulations</h2>
            <Link to="/product" className="text-center">
                <span className="text-2xl ml-2 font-semibold opacity-80 cursor-pointer hover:underline hover:opacity-100 transition">
                    CONTINUE SHOPPING
                </span>
            </Link>
        </div>
    );
}

export default CheckoutSuccessPage;
