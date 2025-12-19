import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';


const Education = () => {
    const [educationData, setEducationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/education`);
                setEducationData(res.data);
            } catch (error) {
                console.error("Error fetching education data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <section id="education" className="pt-32 pb-20 bg-transparent font-sans text-white min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 focus:outline-none">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-cyan-400 font-mono tracking-widest text-sm md:text-base uppercase underline decoration-2 underline-offset-8">Qualifications</h2>
                    <h1 className="text-3xl md:text-4xl font-black italic">Educational <span className="text-cyan-500">Path</span></h1>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Education Timeline */}
                    <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 space-y-12 pl-8">
                        {educationData.map((edu, index) => (
                            <div key={index} className="relative group animate-in slide-in-from-left duration-700 h-full">
                                {/* Dot on timeline */}
                                <div className="absolute -left-[41px] top-0 w-5 h-5 bg-cyan-500 rounded-full border-4 border-slate-950 group-hover:scale-125 transition-transform"></div>

                                <div className="bg-slate-900/40 p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl group-hover:-translate-y-1">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                                        <span className="text-cyan-400 font-bold bg-cyan-500/10 px-4 py-1 rounded-full text-xs">
                                            {edu.year}
                                        </span>
                                        <span className="text-slate-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">{edu.stats}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{edu.degree}</h3>
                                    <p className="text-slate-300 font-semibold mb-3 italic text-sm md:text-base">{edu.institution}</p>
                                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">{edu.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
