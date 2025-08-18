'use client';

import Link from 'next/link';
import { useState, useEffect, MouseEvent } from 'react';

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
];

const TopBar: React.FC = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const smoothScrollTo = (targetPosition: number, duration: number) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        // Easing function for a more natural acceleration/deceleration
        const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeInOutQuad(progress);

            window.scrollTo(0, startPosition + distance * easedProgress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const targetElement = document.querySelector(href);

        if (targetElement) {
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            smoothScrollTo(targetPosition, 1000);
        }
    };

    const linkClassName = "transition duration-300 hover:text-gray-300 hover:-translate-y-1 active:translate-y-0.5";
    const glowingLinkClassName = `${linkClassName} hover:[filter:drop-shadow(0_0_6px_rgba(255,255,255,0.7))]`;

    return (
        <>
            <nav className="fixed top-0 w-full flex justify-center py-4 px-4 sm:px-8 z-50">
                <div className="w-full max-w-7xl flex items-center justify-end lg:justify-center">
                    <div
                        className={`hidden lg:flex items-center gap-x-8 text-white font-semibold px-8 py-4 rounded-full
                                    transition-[background-color,border-color,box-shadow] duration-300 ease-in-out
                                    ${scrolled ? 'bg-black/20 backdrop-blur-lg shadow-lg border-white/10' : 'bg-transparent'}`}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={scrolled ? glowingLinkClassName : linkClassName}
                                onClick={(e) => handleLinkClick(e, link.href)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white z-50"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-lg lg:hidden
                            transition-opacity duration-300 ease-in-out
                            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            >
                <div className="flex flex-col items-center justify-center h-full gap-y-8 text-white text-2xl font-semibold">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={glowingLinkClassName}
                            onClick={(e) => handleLinkClick(e, link.href)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TopBar;