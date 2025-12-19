import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("#home");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "#home" },
        { name: "About", path: "#about" },
        { name: "Education", path: "#education" },
        { name: "Skills", path: "#skills" },
        { name: "Projects", path: "#projects" },
        { name: "Certificates", path: "#certificates" },
        { name: "Contact", path: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "bg-slate-950/70 backdrop-blur-xl py-3 border-b border-slate-800/50 shadow-2xl shadow-cyan-500/5"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="group flex items-center gap-2 text-2xl font-black text-white tracking-tighter"
                >
                    <span className="bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-lg transform -rotate-3 group-hover:rotate-0 transition-transform font-sans">W</span>
                    <span className="hover:text-cyan-400 transition-colors duration-300">AHAB<span className="text-cyan-500">ALI</span></span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={() => setActiveLink(link.path)}
                            className={`relative px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 group ${activeLink === link.path ? "text-cyan-400" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            {link.name}
                            {/* Animated Underline */}
                            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-cyan-500 transition-all duration-300 ${activeLink === link.path ? "w-4" : "w-0 group-hover:w-2"
                                }`}></span>
                        </a>
                    ))}

                    <div className="pl-6">
                        <a
                            href="#contact"
                            className="group relative px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Hire Me <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        </a>
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-white bg-slate-900/50 rounded-xl border border-slate-800 focus:outline-none transition-all hover:border-cyan-500/50"
                    >
                        {isMenuOpen ? <X size={24} className="text-cyan-400" /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="lg:hidden fixed inset-x-0 top-[72px] bg-slate-950/95 backdrop-blur-2xl border-t border-slate-900 z-40 overflow-hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full py-10 space-y-8 px-6">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    href={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-black text-slate-300 hover:text-cyan-400 transition-all uppercase tracking-tighter italic"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                href="#contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full max-w-xs text-center bg-cyan-500 text-slate-950 py-5 rounded-2xl font-black uppercase text-base tracking-widest shadow-2xl shadow-cyan-500/20"
                            >
                                Get In Touch
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
