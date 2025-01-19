import InnerBanner from '@/assets/images/inner-banner.jpg'; // Import the banner image
import JobFilter from './components/filter';
import JobList from './components/list';

function JobPage() {
    return (
        <div className="wrapper mb-12">
            {/* Banner Section */}
            <div className="relative w-full h-64 md:h-80 lg:h-96">
                <img src={InnerBanner} alt="Job Banner" className="absolute inset-0 object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative flex flex-col items-center justify-center h-full text-white">
                    <h1 className="text-3xl md:text-4xl font-bold">CURRENT JOBS</h1>
                    <p className="mt-2 text-sm md:text-base">HOME / PAGES / CURRENT JOBS</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="content-padding bg-transparent mt-8">
                <JobFilter />
                <JobList />
            </div>
        </div>
    );
}

export default JobPage;
