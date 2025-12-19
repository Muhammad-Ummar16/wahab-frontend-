import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, User, BookOpen, PenTool, Layout, Award, Mail, Menu, X, ExternalLink } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
    };

    const sidebarLinks = [
        { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/admin/hero", icon: Layout, label: "Hero Section" },
        { path: "/admin/about", icon: User, label: "About Me" },
        { path: "/admin/education", icon: BookOpen, label: "Education" },
        { path: "/admin/skills", icon: PenTool, label: "Skills" },
        { path: "/admin/projects", icon: Layout, label: "Projects" },
        { path: "/admin/certifications", icon: Award, label: "Certificates" },
        { path: "/admin/contact", icon: Mail, label: "Contact Info" },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-8 border-b border-slate-800/50 flex items-center justify-between">
                <h1 className="text-xl font-black tracking-tighter italic text-white">
                    Admin<span className="text-cyan-400">Panel</span>
                </h1>
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="px-4 pb-2 pt-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
                    Main Menu
                </div>

                {sidebarLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm relative overflow-hidden ${isActive
                                    ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-cyan-500/5"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
                            <span className="relative z-10">{link.label}</span>
                            {isActive && (
                                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                            )}
                        </Link>
                    )
                })}

                <div className="pt-8 mt-8 border-t border-slate-800/50">
                    <div className="px-4 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
                        System
                    </div>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all font-bold text-sm group"
                    >
                        <ExternalLink size={18} className="group-hover:text-cyan-400 transition-colors" />
                        View Website
                    </Link>
                </div>
            </nav>
        </>
    );

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 bg-slate-950 text-white flex-col shadow-2xl z-20 sticky top-0 h-screen border-r border-slate-800/50">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Backrop & Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[90] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-slate-950 text-white flex flex-col shadow-2xl z-[100] lg:hidden border-r border-slate-800/50"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-slate-50 relative w-full overflow-hidden">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shadow-sm sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-cyan-600 transition-colors rounded-lg hover:bg-slate-100"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-black tracking-tight text-slate-800">
                            Portfolio <span className="text-cyan-600">Control</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full hidden md:block border border-slate-200">
                            v2.0 Editor Mode
                        </span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-slate-500 hover:text-rose-600 font-bold text-sm transition-all group px-3 py-1.5 rounded-lg hover:bg-rose-50"
                        >
                            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 p-6 lg:p-10 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
