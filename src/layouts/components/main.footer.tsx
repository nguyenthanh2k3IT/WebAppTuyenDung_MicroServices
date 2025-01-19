import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Youtube, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import footerBg from '@/assets/images/footer-bg.jpg';
import WebTitle from '@/components/label/web-title.label';

const companyLinks = [
    { title: 'About Us', href: '/about' },
    { title: 'Help Center', href: '/help' },
    { title: 'Blog', href: '/blog' },
    { title: 'Careers', href: '/careers' },
    { title: 'Contact Us', href: '/contact' },
];

const quickLinks = [
    { title: 'How It Works', href: '/how-it-works' },
    { title: 'Add Listing', href: '/add-listing' },
    { title: 'Popular Categories', href: '/categories' },
    { title: 'Popular Places', href: '/places' },
    { title: 'FAQ', href: '/faq' },
];

function MainFooter() {
    return (
        <footer
            className="relative bg-[#1E2532] bg-cover bg-center bg-no-repeat text-white content-padding"
            style={{ backgroundImage: `url(${footerBg})` }}
        >
            {/* Top Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Follow Us Section */}
                    <div>
                        <h3 className="text-[#1DA1F2] font-semibold text-xl mb-4">Follow us on</h3>
                        <div className="flex gap-4">
                            <Link
                                to="#"
                                className="bg-[#2A303C] p-2 rounded-full hover:text-[#4267B2] transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link
                                to="#"
                                className="bg-[#2A303C] p-2 rounded-full hover:text-[#1DA1F2] transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link
                                to="#"
                                className="bg-[#2A303C] p-2 rounded-full hover:text-[#0077B5] transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link
                                to="#"
                                className="bg-[#2A303C] p-2 rounded-full hover:text-[#FF0000] transition-colors"
                            >
                                <Globe className="w-5 h-5" />
                            </Link>
                            <Link
                                to="#"
                                className="bg-[#2A303C] p-2 rounded-full hover:text-[#FF0000] transition-colors"
                            >
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Need Help Section */}
                    <div>
                        <h3 className="text-[#1DA1F2] font-semibold text-xl mb-4">Need Help ?</h3>
                        <p className="text-lg">CALL US : 1800-0000-1234</p>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-[#1DA1F2] font-semibold text-xl mb-4">Subscribe Our Newsletter</h3>
                        <div className="flex">
                            <Input
                                type="email"
                                placeholder="Enter your Email"
                                className="rounded-l-full bg-[#2A303C] border-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button className="rounded-r-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90">SUBSCRIBE</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Logo and Description */}
                        <div className="md:col-span-2 pr-8">
                            <WebTitle className="mb-4" />
                            <p className="text-gray-400 max-w-xl text-justify mb-2">
                                Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel,
                                scelerisque eget, malesuada at, neque. Vivamus eget nibh. Etiam cursus leo vel metus.
                                Nulla facilisi.
                            </p>
                            <p className="text-gray-400 max-w-xl text-justify">
                                Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel,
                                scelerisque eget, malesuada at, neque. Vivamus eget nibh. Etiam cursus leo vel metus.
                                Nulla facilisi.
                            </p>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="text-[#1DA1F2] font-semibold text-xl mb-4">Company</h3>
                            <ul className="space-y-2">
                                {companyLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-[#1DA1F2] font-semibold text-xl mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default MainFooter;
