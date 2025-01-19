import { Button } from '@/components/ui/button';

const blogPosts = [
    {
        id: 1,
        image: 'https://sbtechnosoft.com/recruitepro/images/blog-img1.jpg',
        title: 'TONSECTETUR ADIPISCING ELIT.',
        subtitle: 'VIVA MUS ID INTERDUM NIBH, EU',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget odio condimentum, suscipit elit non,sodales mauris.',
    },
    {
        id: 2,
        image: 'https://sbtechnosoft.com/recruitepro/images/blog-img2.jpg',
        title: 'TONSECTETUR ADIPISCING ELIT.',
        subtitle: 'VIVA MUS ID INTERDUM NIBH, EU',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget odio condimentum, suscipit elit non,sodales mauris.',
    },
    {
        id: 3,
        image: 'https://sbtechnosoft.com/recruitepro/images/blog-img3.jpg',
        title: 'TONSECTETUR ADIPISCING ELIT.',
        subtitle: 'VIVA MUS ID INTERDUM NIBH, EU',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget odio condimentum, suscipit elit non,sodales mauris.',
    },
];

const LatestBlog = () => {
    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Blog</h2>
                <p className="text-gray-600">Here you can see</p>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                {blogPosts.map((post) => (
                    <div key={post.id} className="group cursor-pointer">
                        {/* Image */}
                        <div className="relative h-[240px] mb-6 overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="bg-[#1E2532] text-white p-6 group-hover:bg-app-primary-bold">
                            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                            <h4 className="text-app-primary group-hover:text-white mb-4">{post.subtitle}</h4>
                            <p className="text-gray-300 text-sm">{post.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visit Blog Button */}
            <div className="text-center">
                <Button variant="secondary" className="bg-[#1E2532] text-white hover:bg-[#1E2532]/90 px-8 py-6">
                    VISIT OUR BLOG
                </Button>
            </div>
        </div>
    );
};

export default LatestBlog;
