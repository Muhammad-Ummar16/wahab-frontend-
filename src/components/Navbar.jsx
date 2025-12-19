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

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
                        />

                        {/* Sidebar Tray */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-slate-950/95 backdrop-blur-2xl border-r border-slate-800/50 z-50 flex flex-col shadow-2xl"
                        >
                            {/* Sidebar Header */}
                            <div className="p-8 pb-4 flex justify-between items-center border-b border-slate-900/50">
                                <Link
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 text-xl font-black text-white tracking-tighter"
                                >
                                    <span className="bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-lg font-sans">W</span>
                                    <span>AHAB</span>
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 rounded-lg border border-slate-800"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Sidebar Links */}
                            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                                {navLinks.map((link, idx) => (
                                    <motion.a
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        href={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${activeLink === link.path
                                                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
                                            }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeLink === link.path ? "bg-cyan-400 scale-100" : "bg-slate-700 scale-0 group-hover:scale-100"
                                            }`} />
                                        <span className="text-sm font-black uppercase tracking-widest">{link.name}</span>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-6 border-t border-slate-900/50">
                                <motion.a
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    href="#contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
                                >
                                    <ArrowRight size={16} /> Get In Touch
                                </motion.a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
