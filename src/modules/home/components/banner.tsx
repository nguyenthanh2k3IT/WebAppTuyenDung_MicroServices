import { useState } from 'react';
import banner1 from '@/assets/images/banner1.jpg';
import banner2 from '@/assets/images/banner2.jpg';
import banner3 from '@/assets/images/banner3.jpg';
import { Fade } from '@/components/animate';

function Banner() {
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

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

    const handleSlideChange = (newIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentBanner(newIndex);
        // Reset animation flag after transition
        setTimeout(() => setIsAnimating(false), 400); // 400ms = 2x fade duration
    };

    const nextBanner = () => {
        const newIndex = (currentBanner + 1) % banners.length;
        handleSlideChange(newIndex);
    };

    const prevBanner = () => {
        const newIndex = (currentBanner - 1 + banners.length) % banners.length;
        handleSlideChange(newIndex);
    };

    const getVisibleBanners = () => {
        const visibleBanners = [];
        const currentBannerData = banners[currentBanner];

        // Add previous banner if it exists
        const prevIndex = (currentBanner - 1 + banners.length) % banners.length;
        visibleBanners.push({
            ...banners[prevIndex],
            index: prevIndex,
        });

        // Always show current banner
        visibleBanners.push({
            ...currentBannerData,
            index: currentBanner,
        });

        // Add next banner if it exists
        const nextIndex = (currentBanner + 1) % banners.length;
        visibleBanners.push({
            ...banners[nextIndex],
            index: nextIndex,
        });

        return visibleBanners;
    };

    return (
        <div className="relative h-[500px] w-full overflow-hidden">
            {/* Banner Images */}
            <div className="relative h-full w-full">
                {getVisibleBanners().map(({ image, title, description, buttonText, index }) => (
                    <Fade
                        key={index}
                        show={currentBanner === index}
                        duration={400}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div className="absolute inset-0">
                            <img
                                src={image}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover brightness-[0.85]"
                            />

                            {/* Banner Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 max-w-3xl px-4">
                                    {title.includes('1,259') ? (
                                        <>
                                            <span className="text-white">{title.split('1,259')[0]}</span>
                                            <span className="text-app-primary">1,259</span>
                                            <span className="text-white">{title.split('1,259')[1]}</span>
                                        </>
                                    ) : (
                                        title
                                    )}
                                </h1>
                                <p className="text-lg sm:text-xl mb-8 px-4">{description}</p>
                                <button
                                    className="bg-app-primary hover:bg-app-primary-bold text-white font-bold 
                                    py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-colors text-sm sm:text-base"
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevBanner}
                disabled={isAnimating}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 
                text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isAnimating}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 
                text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={isAnimating}
                        onClick={() => handleSlideChange(index)}
                        className={`w-3 h-3 rounded-full transition-colors
                            ${currentBanner === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}
                            ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        aria-label={`Go to banner ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner;
