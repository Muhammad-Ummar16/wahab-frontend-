import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { User, Lock, LogIn, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            toast.success('Welcome back, Wahab!', {
                icon: '👑',
                style: {
                    borderRadius: '16px',
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid #1e293b'
                },
            });
            navigate('/admin');
        } else {
            toast.error('Invalid credentials. Please try again.', {
                style: {
                    borderRadius: '16px',
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid #1e293b'
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl mb-6 relative group">
                        <div className="absolute inset-0 bg-cyan-500/20 rounded-3xl blur-xl transition-all group-hover:bg-cyan-500/30"></div>
                        <LogIn size={40} className="text-cyan-400 relative z-10" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2 italic">
                        Admin <span className="text-cyan-500 underline decoration-cyan-500/30 underline-offset-8">Access</span>
                    </h1>
                    <p className="text-slate-400 font-medium">Control Center • Wahab Portfolio</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2rem] shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <User size={14} className="text-cyan-500" /> Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl p-4 outline-none text-white transition-all pl-12"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Lock size={14} className="text-cyan-500" /> Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl p-4 outline-none text-white transition-all pl-12"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-cyan-500/20 uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            Log Into Dashboard <Sparkles size={18} />
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors underline decoration-slate-800 underline-offset-4"
                    >
                        Back to Website
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
