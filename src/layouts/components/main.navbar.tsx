import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WebTitle from '@/components/label/web-title.label';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown, Globe, LogOut } from 'lucide-react';
import AnimateHeight from '@/components/animate/animate-height';

const navLinks = [
    {
        title: 'All Jobs',
        href: '/jobs',
        options: ['Frontend Jobs', 'Backend Jobs', 'Fullstack Jobs', 'DevOps Jobs', 'Mobile Jobs'],
    },
    {
        title: 'IT Companies',
        href: '/companies',
        options: ['Top Companies', 'Startup Companies', 'Foreign Companies', 'Vietnamese Companies'],
    },
    {
        title: 'Blog',
        href: '/blog',
        options: ['Tech News', 'Career Tips', 'Interview Tips', 'Work Culture'],
    },
];

function MainNavbar() {
    const [isLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const toggleExpand = (title: string) => {
        setExpandedItem(expandedItem === title ? null : title);
    };

    return (
        <div className="w-full sticky top-0 z-20 bg-white shadow-md">
            <div className="max-w-[1290px] mx-auto content-padding">
                <div className="flex items-center justify-between h-16 ">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <WebTitle />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Nav Links */}
                        <nav className="flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <DropdownMenu key={link.title}>
                                    <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-app-primary">
                                        <span>{link.title}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Option 1</DropdownMenuItem>
                                        <DropdownMenuItem>Option 2</DropdownMenuItem>
                                        <DropdownMenuItem>Option 3</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ))}
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center space-x-4">
                            {isLoggedIn ? (
                                <>
                                    <Button variant="ghost" size="sm" className="text-gray-700">
                                        <Globe className="h-5 w-5 mr-2" />
                                        EN | VI
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-700">
                                        For Employers
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                My Account
                                                <ChevronDown className="h-4 w-4 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Settings</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" className="text-gray-700">
                                        <Globe className="h-5 w-5 mr-2" />
                                        EN | VI
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-700">
                                        For Employers
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Sign in/Sign up
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimateHeight isVisible={isMobileMenuOpen}>
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <div key={link.title} className="border-b border-gray-100 last:border-b-0">
                                    <div
                                        className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700"
                                        onClick={() => toggleExpand(link.title)}
                                    >
                                        <span>{link.title}</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-300 ${
                                                expandedItem === link.title ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </div>
                                    {/* Submenu with animation */}
                                    <AnimateHeight isVisible={expandedItem === link.title}>
                                        <div className="bg-gray-50 py-2">
                                            {link.options.map((option) => (
                                                <Link
                                                    key={option}
                                                    to="#"
                                                    className="block px-6 py-2 text-sm text-gray-600 hover:text-app-primary hover:bg-gray-100"
                                                >
                                                    {option}
                                                </Link>
                                            ))}
                                        </div>
                                    </AnimateHeight>
                                </div>
                            ))}

                            {/* Auth section */}
                            <div className="pt-4 border-t border-gray-200">
                                {isLoggedIn ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-gray-700"
                                        >
                                            <Globe className="h-5 w-5 mr-2" />
                                            EN | VI
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-gray-700"
                                        >
                                            For Employers
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-gray-700"
                                        >
                                            My Account
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-gray-700"
                                        >
                                            <Globe className="h-5 w-5 mr-2" />
                                            EN | VI
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-gray-700"
                                        >
                                            For Employers
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full mt-2">
                                            Sign in/Sign up
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </AnimateHeight>
            </div>
        </div>
    );
}

export default MainNavbar;
