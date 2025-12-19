import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../../config';

const Hero = () => {
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/hero`);
                setHeroData(res.data);
            } catch (error) {
                console.error("Error fetching hero data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, []);

    if (loading || !heroData) return null;

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-transparent">
            {/* Global Background is now handled by UserLayout */}

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div className="text-center md:text-left space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <div className="space-y-4">
                        <h2 className="text-cyan-400 font-mono tracking-widest text-sm md:text-base">
                            Hello, I'm
                        </h2>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                            {heroData.name} <span className="text-cyan-500">{heroData.lastName}</span>
                        </h1>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-300">
                            Professional <span className="text-cyan-400">{heroData.role}</span>
                        </h3>
                        <p className="max-w-xl text-slate-400 text-base md:text-lg leading-relaxed">
                            {heroData.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                        <a
                            href="#projects"
                            className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-6 py-3.5 rounded-xl font-bold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20 text-center"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="border-2 border-slate-700 hover:border-cyan-500 text-white px-6 py-3.5 rounded-xl font-bold text-base transition-all hover:bg-cyan-500/10 active:scale-95 text-center"
                        >
                            Contact Me
                        </a>
                        {heroData.cvUrl && (
                            <a
                                href={heroData.cvUrl}
                                download
                                className="group flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-base px-2 underline underline-offset-8 decoration-2 decoration-cyan-500/30 hover:decoration-cyan-500 transition-all"
                            >
                                Download CV
                                <svg
                                    className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                        )}
                    </div>

                    {/* Stats or trust signals can go here later */}
                    <div className="flex items-center gap-8 pt-6 justify-center md:justify-start opacity-70">
                        <div className="text-center md:text-left">
                            <p className="text-white font-bold text-xl md:text-2xl">{heroData.experience}</p>
                            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Years Exp.</p>
                        </div>
                        <div className="h-10 w-[1px] bg-slate-800"></div>
                        <div className="text-center md:text-left">
                            <p className="text-white font-bold text-xl md:text-2xl">{heroData.projects}</p>
                            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Projects Done</p>
                        </div>
                    </div>
                </div>

                {/* Right Content - Image */}
                <div className="relative flex justify-center items-center animate-in fade-in slide-in-from-right duration-1000 lg:justify-end">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
                        {/* Background decorative elements */}
                        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                        <div className="absolute -inset-6 border border-cyan-500/10 rounded-full animate-spin-slow"></div>
                        <div className="absolute -inset-10 border border-slate-800/50 rounded-full animate-reverse-spin-slow"></div>

                        {/* Main Image Frame - Refined for "Perfect" Look */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group/img">
                            {/* Inner Glow/Border */}
                            <div className="absolute inset-0 border-[8px] border-slate-900 z-10 rounded-2xl"></div>
                            <div className="absolute inset-0 border-2 border-cyan-500/20 z-20 rounded-2xl pointer-events-none group-hover/img:border-cyan-500/40 transition-colors duration-500"></div>

                            <img
                                src={heroData.image}
                                alt={`${heroData.name} ${heroData.lastName}`}
                                className="w-full h-full object-cover transform scale-105 group-hover/img:scale-110 transition-transform duration-1000"
                            />

                            {/* Subtle Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10"></div>
                        </div>

                        {/* Floating badges - Moved to front layer */}
                        <div className="absolute -bottom-4 -left-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl z-20 animate-bounce hover:scale-110 transition-transform duration-300 group/badge cursor-default">
                            <div className="flex items-center gap-3">
                                <div className="bg-cyan-500 p-2 rounded-lg group-hover/badge:rotate-12 transition-transform">
                                    <svg className="w-6 h-6 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-black uppercase tracking-tight">Marketing</p>
                                    <p className="text-cyan-500 text-[10px] font-black uppercase tracking-widest">Expert</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
