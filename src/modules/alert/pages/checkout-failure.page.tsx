import Fail from '@/assets/images/checkout-fail.png';
import { Link } from 'react-router-dom';

function CheckoutFailurePage() {
    return (
        <div className="max-w-3xl mx-auto h-screen flex flex-col">
            <img src={Fail} alt="success" className="mt-20 max-w-xl mx-auto" />
            <h2 className="text-center text-red-600 text-3xl uppercase font-bold">
                SOMETHING WENT WRONG PLEASE TRY AGAIN
            </h2>
            <Link to="/" className="text-center mt-2">
                <span className="text-xl ml-2 font-semibold opacity-80 cursor-pointer hover:underline hover:opacity-100 transition">
                    BACK TO HOME PAGE
                </span>
            </Link>
        </div>
    );
}

export default CheckoutFailurePage;
