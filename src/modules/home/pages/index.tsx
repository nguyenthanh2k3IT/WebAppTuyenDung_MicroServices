import Banner from '../components/banner';
import SearchBar from '../components/search-bar';
import LatestJobs from '../components/latest-jobs';
import Subscribe from '../components/subscribe';
import LatestBlog from '../components/latest-blog';

function HomePage() {
    return (
        <div className="wrapper">
            <Banner />
            <SearchBar />
            <LatestJobs />
            <Subscribe />
            <LatestBlog />
        </div>
    );
}

export default HomePage;
