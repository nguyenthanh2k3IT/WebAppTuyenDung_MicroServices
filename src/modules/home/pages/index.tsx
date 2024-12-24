import image0 from './img_Home/group-10.avif';
import image1 from './img_Home/anh1.avif';
import image2 from './img_Home/anh2.avif';
import image3 from './img_Home/anh3.avif';
import image4 from './img_Home/anh4.avif';
import image5 from './img_Home/anh5.webp';
import image6 from './img_Home/anh6.jpg';
import image7 from './img_Home/anh02.avif';
import { FaFacebook, FaInstagram, FaSnapchat, FaCcVisa, FaCcMastercard, FaPaypal, FaCcAmex } from 'react-icons/fa';

function HomePage() {
    return (
        <div className="mx-auto max-w-[1290px]">
            <div className="p-8 ">
                <div className="mb-8 relative">
                    <img src={image0} alt="Banner" className="w-full h-auto mx-auto" />
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white">
                        We like the cold
                    </h1>
                </div>
            </div>
            <div className="flex items-center justify-center h-22">
                <h2 className="text-4xl font-bold text-center">New in</h2>
            </div>
            <div className="w-full  mx-auto px-4 py-8">
                {/* Grid ảnh */}
                <div className="grid grid-cols-6 gap-4 w-full h-auto">
                    {/* Card 1 */}
                    <a href="#" className="relative group">
                        <img src={image1} alt="Carhartt WIP" className="w-full" />
                        <div className="absolute bottom-3 w-full text-center text-white font-bold text-2xl">
                            Carhartt WIP
                        </div>
                    </a>

                    {/* Card 2 */}
                    <a href="#" className="relative group">
                        <img src={image2} alt="All dressed up" className="w-full" />
                        <div className="absolute bottom-3 w-full text-center text-white font-bold text-2xl">
                            All dressed up
                        </div>
                    </a>

                    {/* Card 3 */}
                    <a href="#" className="relative group">
                        <img src={image3} alt="The latest drops" className="w-full" />
                        <div className="absolute bottom-3 w-full text-center text-white font-bold text-2xl">
                            The latest drops
                        </div>
                    </a>

                    {/* Card 4 */}
                    <a href="#" className="relative group">
                        <img src={image4} alt="Reclaimed Vintage" className="w-full" />
                        <div className="absolute bottom-3 w-full text-center text-white font-bold text-2xl">
                            Reclaimed Vintage
                        </div>
                    </a>

                    {/* Card 5 */}
                    <a href="#" className="relative group">
                        <img src={image5} alt="TOPMAN" className="w-full" />
                    </a>

                    {/* Card 6 */}
                    <a href="#" className="relative group">
                        <img src={image6} alt="Modern heritage" className="w-full" />
                        <div className="absolute bottom-3 w-full text-center text-white font-bold text-2xl">
                            Modern heritage
                        </div>
                    </a>
                </div>

                <div className="mt-10 text-center py-6 rounded-lg">
                    <img src={image7} alt="Carhartt WIP" className="w-full h-full " />
                </div>
            </div>
            {/* Icon */}
            <div className="flex items-center justify-center space-x-12 py-8 bg-white border border-gray-300 rounded-lg">
                <div className="flex items-center space-x-8">
                    <div className="relative group">
                        <FaFacebook className="text-blue-600 text-5xl bg-white rounded-full p-3 border border-gray-300 transition-transform duration-300 group-hover:scale-110" />
                        <span className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-blue-600"></span>
                    </div>
                    <div className="relative group">
                        <FaInstagram className="text-purple-600 text-5xl bg-white rounded-full p-3 border border-gray-300 transition-transform duration-300 group-hover:scale-110" />
                        <span className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-blue-600"></span>
                    </div>
                    <div className="relative group">
                        <FaSnapchat className="text-yellow-400 text-5xl bg-white rounded-full p-3 border border-gray-300 transition-transform duration-300 group-hover:scale-110" />
                        <span className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-blue-600"></span>
                    </div>
                </div>

                <div className="border-l border-gray-300 h-12"></div>

                <div className="flex items-center space-x-8">
                    <FaCcVisa className="text-blue-500 text-5xl" />
                    <FaCcMastercard className="text-red-600 text-5xl" />
                    <FaPaypal className="text-blue-600 text-5xl" />
                    <FaCcAmex className="text-blue-500 text-5xl" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
