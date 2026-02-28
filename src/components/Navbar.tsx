import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const location = useLocation();

    const navLinks = [
        { name: "Home", href: "/", isRoute: true },
        { name: "Events", href: "/events", isRoute: true },
        { name: "About", href: "/about", isRoute: true },
        { name: "Timeline", href: "/timeline", isRoute: true },
        { name: "Rules", href: "/rules", isRoute: true },
        { name: "Support", href: "/support", isRoute: true },
    ];

    // Sync active link with current route
    useEffect(() => {
        const match = navLinks.find(l => l.href === location.pathname);
        if (match) setActiveLink(match.name);
    }, [location.pathname]);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out"
            style={{
                padding: isScrolled ? "8px 12px 0" : "0",
            }}
        >
            <div
                className="w-full transition-all duration-500 ease-in-out"
                style={{
                    borderRadius: isScrolled ? "16px" : "0",
                    background: isScrolled ? "rgba(0, 0, 0, 0.45)" : "transparent",
                    backdropFilter: isScrolled ? "blur(20px)" : "none",
                    WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
                    border: isScrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                    boxShadow: isScrolled
                        ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
                        : "none",
                    padding: isScrolled ? "10px 24px" : "14px 32px",
                }}
            >
                {/* 3-column grid: logo | nav links | actions — nav links always centered */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                    {/* Left — Logo */}
                    <div className="flex items-center gap-2.5">
                        <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
                        <span className="font-heading text-[10px] md:text-xs font-bold tracking-[0.08em] text-white/90 hidden sm:block whitespace-nowrap">
                            MCC Bengaluru
                        </span>
                    </div>

                    {/* Center — Nav Links (always centered on screen) */}
                    <div className="hidden lg:flex items-center bg-white/[0.06] rounded-full px-1 py-0.5 border border-white/[0.06]">
                        {navLinks.map((link) => {
                            const linkClass = `relative px-4 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-300 rounded-full whitespace-nowrap ${activeLink === link.name ? "text-black" : "text-gray-300 hover:text-white"}`;
                            const inner = (
                                <>
                                    {activeLink === link.name && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-accent rounded-full shadow-[0_0_12px_rgba(0,255,255,0.4)]"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </>
                            );
                            return link.isRoute ? (
                                <Link key={link.name} to={link.href} onClick={() => setActiveLink(link.name)} className={linkClass}>
                                    {inner}
                                </Link>
                            ) : (
                                <a key={link.name} href={link.href} onClick={() => setActiveLink(link.name)} className={linkClass}>
                                    {inner}
                                </a>
                            );
                        })}
                    </div>

                    {/* Right — Actions (justified to end) */}
                    <div className="hidden lg:flex items-center gap-2 justify-end">
                        <button className="px-4 py-1.5 text-[11px] font-heading tracking-widest rounded-full border border-white/15 text-white hover:bg-accent hover:text-black hover:border-accent hover:shadow-[0_0_16px_rgba(0,255,255,0.3)] transition-all duration-300">
                            LOGIN
                        </button>
                    </div>

                    {/* Mobile — Toggle (spans to right on small screens) */}
                    <div className="lg:hidden flex justify-end col-start-3">
                        <button
                            className="text-white p-2 rounded-full hover:bg-white/[0.08] transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-4 right-4 lg:hidden
                            bg-black/50 backdrop-blur-2xl border border-white/[0.1]
                            rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]
                            overflow-hidden py-4 px-2"
                    >
                        <div className="flex flex-col items-center gap-1">
                            {navLinks.map((link) => {
                                const mobileClass = `w-full text-center py-3 px-4 rounded-xl text-sm tracking-wide transition-all duration-200 ${activeLink === link.name ? "bg-accent/10 text-accent font-medium" : "text-gray-300 hover:text-white hover:bg-white/[0.05]"}`;
                                const mobileClick = () => { setActiveLink(link.name); setIsMobileMenuOpen(false); };
                                return link.isRoute ? (
                                    <Link key={link.name} to={link.href} className={mobileClass} onClick={mobileClick}>
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a key={link.name} href={link.href} className={mobileClass} onClick={mobileClick}>
                                        {link.name}
                                    </a>
                                );
                            })}
                            <div className="w-full border-t border-white/[0.08] mt-2 pt-3 px-4">
                                <button className="w-full py-2.5 bg-accent/10 text-accent text-sm font-heading tracking-widest rounded-xl border border-accent/20 hover:bg-accent hover:text-black transition-all duration-300">
                                    LOGIN
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
