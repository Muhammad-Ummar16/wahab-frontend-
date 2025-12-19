import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import GlobalBackground from "../components/GlobalBackground";

const UserLayout = () => {
    return (
        <div className="min-h-screen text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-400 overflow-x-hidden">
            {/* The absolute base background color */}
            <div className="fixed inset-0 bg-slate-950 -z-20" />

            <GlobalBackground />
            <Navbar />
            <main className="relative z-10">
                <Outlet />
            </main>
            <footer className="relative z-10 py-10 border-t border-slate-900 text-center text-slate-500 text-sm bg-slate-950/50 backdrop-blur-sm">
                <p>&copy; {new Date().getFullYear()} Wahab Portfolio. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default UserLayout;
