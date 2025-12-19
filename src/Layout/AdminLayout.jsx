import React from "react";
import { Outlet, Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AdminLayout = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
    };

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-black tracking-tight italic">Admin<span className="text-cyan-400">Panel</span></h1>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">Dashboard</Link>
                    <div className="pt-4 pb-2 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Content</div>
                    <Link to="/admin/hero" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">Hero Section</Link>
                    <Link to="/admin/about" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">About Me</Link>
                    <Link to="/admin/education" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">Education</Link>
                    <Link to="/admin/skills" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">Skills</Link>
                    <Link to="/admin/projects" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">Projects</Link>
                    <Link to="/admin/certifications" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">Certificates</Link>
                    <Link to="/admin/contact" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">Contact Info</Link>

                    <div className="pt-10 border-t border-slate-800 mt-10">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 rounded-xl transition-all font-bold text-sm">
                            View Website
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-slate-50/50">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm relative z-10">
                    <h2 className="text-lg font-black tracking-tight text-slate-800">Portfolio <span className="text-cyan-600">Control</span></h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full hidden md:block">Editor Mode</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-sm transition-colors group"
                        >
                            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                            Logout
                        </button>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
