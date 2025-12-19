import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';


const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/about`);
                setAboutData(res.data);
            } catch (error) {
                console.error("Error fetching about data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);

    if (loading || !aboutData) return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <section id="about" className="pt-32 pb-20 bg-transparent font-sans text-white min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    {/* Image Column - Reduced Size & Premium Framing */}
                    <div className="w-full md:w-5/12 relative group">
                        <div className="absolute -inset-6 bg-cyan-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative rounded-3xl overflow-hidden border-4 border-slate-900 bg-slate-900 shadow-2xl group">
                            <div className="absolute inset-0 border-2 border-cyan-500/10 group-hover:border-cyan-500/30 transition-colors duration-500 z-10 pointer-events-none"></div>
                            <img
                                src={aboutData.image}
                                alt="About Wahab Ali"
                                className="w-full h-auto aspect-[3/4] object-cover transform transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                        </div>
                    </div>

                    {/* Content Column - Expanded for Better Flow */}
                    <div className="w-full md:w-7/12 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-cyan-400 font-mono tracking-widest text-sm md:text-base uppercase">Discover</h2>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                                About <span className="text-cyan-500 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Me</span>
                            </h1>
                        </div>

                        <div className="space-y-6 text-slate-400 text-base md:text-lg leading-relaxed">
                            <p>
                                {aboutData.bio1}
                            </p>
                            <p>
                                {aboutData.bio2}
                            </p>
                        </div>

                        {/* Mission & Vision Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/40 transition-colors">
                                <div className="text-cyan-400 mb-4 h-10 w-10 flex items-center justify-center bg-cyan-500/10 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-bold text-lg md:text-xl mb-2">Our Mission</h3>
                                <p className="text-slate-500 text-xs md:text-sm">{aboutData.mission}</p>
                            </div>
                            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/40 transition-colors">
                                <div className="text-cyan-400 mb-4 h-10 w-10 flex items-center justify-center bg-cyan-500/10 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-bold text-lg md:text-xl mb-2">Our Vision</h3>
                                <p className="text-slate-500 text-xs md:text-sm">{aboutData.vision}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
