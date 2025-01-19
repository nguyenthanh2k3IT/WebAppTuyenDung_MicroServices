import { useState } from 'react';
import banner1 from '@/assets/images/banner1.jpg';
import banner2 from '@/assets/images/banner2.jpg';
import banner3 from '@/assets/images/banner3.jpg';

function Banner() {
    const [currentBanner, setCurrentBanner] = useState(0);

    const banners = [
        {
            image: banner1,
            title: 'We offer 1,259 job vacancies right now!',
            description: 'Find your desire one in a minute',
            buttonText: 'SEARCH FOR PROFESSIONALS',
        },
        {
            image: banner2,
            title: 'Looking for the perfect candidate?',
            description: 'Browse through our talent pool',
            buttonText: 'SEARCH FOR PROFESSIONALS',
        },
        {
            image: banner3,
            title: 'Connect with top talent',
            description: 'Your next hire is here',
            buttonText: 'SEARCH FOR PROFESSIONALS',
        },
    ];

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative h-[500px] w-full">
            {/* Banner Image */}
            <div className="relative h-full w-full">
                <img
                    src={banners[currentBanner].image}
                    alt={`Banner ${currentBanner + 1}`}
                    className="w-full h-full object-cover brightness-[0.85]"
                />

                {/* Banner Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                    <h1 className="text-5xl font-bold mb-4 max-w-3xl">
                        <span className="text-white">{banners[currentBanner].title.split('1,259')[0]}</span>
                        <span className="text-app-primary">1,259</span>
                        <span className="text-white">{banners[currentBanner].title.split('1,259')[1]}</span>
                    </h1>
                    <p className="text-xl mb-8">{banners[currentBanner].description}</p>
                    <button className="bg-app-primary hover:bg-app-primary-bold text-white font-bold py-4 px-8 rounded-full transition-colors">
                        {banners[currentBanner].buttonText}
                    </button>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevBanner}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                aria-label="Previous banner"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                onClick={nextBanner}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                aria-label="Next banner"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentBanner(index)}
                        className={`w-3 h-3 rounded-full ${currentBanner === index ? 'bg-white' : 'bg-white/50'}`}
                        aria-label={`Go to banner ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner;
