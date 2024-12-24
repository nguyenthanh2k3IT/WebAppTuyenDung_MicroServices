import { Link } from 'react-router-dom';

const footerSections = [
    {
        title: 'HELP & INFORMATION',
        links: ['Help', 'Track order', 'Delivery & returns', 'Sitemap'],
    },
    {
        title: 'ABOUT ASOS',
        links: ['About us', 'Careers at ASOS', 'Corporate responsibility', "Investors' site"],
    },
    {
        title: 'MORE FROM ASOS',
        links: [
            'Mobile and ASOS apps',
            'ASOS Marketplace',
            'Gift vouchers',
            'Black Friday',
            'ASOS x Thrift+',
            'Discover the ASOS Credit Card',
        ],
    },
    {
        title: 'CUSTOMER CARE',
        links: ['Contact us', 'FAQ', 'Size guide', 'Student discount', 'Accessibility'],
    },
];

function MainFooter() {
    return (
        <footer className="bg-gray-100 pt-10 pb-6 px-4 md:px-10 bottom-0">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-bold mb-4 text-gray-600">{section.title}</h3>
                            <ul>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className="mb-2">
                                        <Link to="#" className="text-sm text-gray-600 hover:underline">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-600">© 2024 ASOS</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link to="#" className="text-sm text-gray-600 hover:underline">
                            Privacy & Cookies
                        </Link>
                        <Link to="#" className="text-sm text-gray-600 hover:underline">
                            Ts&Cs
                        </Link>
                        <Link to="#" className="text-sm text-gray-600 hover:underline">
                            Accessibility
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default MainFooter;
