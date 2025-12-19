import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';
import API_URL from '../../config';


const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/certifications`);
                setCertificates(res.data);
            } catch (error) {
                console.error("Error fetching certificates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <section id="certificates" className="pt-32 pb-20 bg-transparent font-sans text-white min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-cyan-400 font-mono tracking-widest text-sm md:text-base uppercase underline decoration-2 underline-offset-8">Validation</h2>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black italic">Professional <span className="text-cyan-500">Certifications</span></h1>
                    <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base">Industry-recognized credentials that validate my expertise in various digital marketing domains.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert) => (
                        <Link
                            key={cert.id}
                            to={`/certificates/${cert.id}`}
                            className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/50 transition-all backdrop-blur-sm hover:-translate-y-2 duration-300"
                        >
                            <div className="text-cyan-400 mb-6 flex justify-between items-start">
                                <div className="p-4 bg-cyan-500/10 rounded-2xl group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500">
                                    <Award size={32} />
                                </div>
                                <span className="text-cyan-500/40 font-mono text-sm">{cert.year}</span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors italic leading-tight uppercase">
                                {cert.name}
                            </h3>
                            <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
                                {cert.issuer}
                            </p>

                            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider group-hover:gap-4 transition-all pt-4 border-t border-slate-800">
                                View Full Details <ArrowRight size={14} />
                            </div>

                            {/* Decorative blur */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full -mb-8 -mr-8 group-hover:bg-cyan-500/10 transition-colors"></div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
