import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Subscribe = () => {
    return (
        <div
            className="relative h-[300px] md:h-[400px] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url(https://sbtechnosoft.com/recruitepro/images/subscribe-bg.jpg)',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-2">Subscribe</h2>
                <p className="text-white text-center text-sm md:text-base mb-8">
                    Get weekly top new jobs delivered to your inbox
                </p>

                {/* Subscribe Form */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                    <Input
                        type="email"
                        placeholder="Enter your Email"
                        className="h-12 bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Button className="h-12 px-8 bg-app-primary hover:bg-app-primary/90 text-white">SUBSCRIBE</Button>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
