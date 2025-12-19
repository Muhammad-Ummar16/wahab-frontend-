import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Award, Calendar, Building, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-react';
import API_URL from '../../config';


const CertificateDetail = () => {
    const { id } = useParams();
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCert = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/certifications`);
                // Since our toy backend returns an array for certifications, we find the one by ID
                const found = res.data.find(c => c.id.toString() === id);
                setCert(found);
            } catch (error) {
                console.error("Error fetching certificate detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCert();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    if (!cert) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white space-y-6">
            <h1 className="text-4xl font-black italic">Certificate <span className="text-cyan-500">Not Found</span></h1>
            <Link to="/#certificates" className="text-cyan-400 flex items-center gap-2 hover:underline">
                <ArrowLeft size={18} /> Back to Certificates
            </Link>
        </div>
    );

    return (
        <div className="pt-32 pb-20 bg-transparent font-sans text-white min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <Link to="/#certificates" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
                    <ArrowLeft size={16} /> All Certificates
                </Link>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left: Content */}
                    <div className="space-y-10 animate-in fade-in slide-in-from-left duration-700">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-cyan-400">
                                <Award size={24} />
                                <span className="text-sm font-mono tracking-tighter uppercase font-black uppercase tracking-widest">Verified Credential</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black italic leading-tight uppercase">
                                {cert.name}
                            </h1>
                            <div className="flex flex-wrap gap-6 pt-4">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Building size={18} className="text-cyan-500/60" />
                                    <span className="text-sm font-bold uppercase">{cert.issuer}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Calendar size={18} className="text-cyan-500/60" />
                                    <span className="text-sm font-bold uppercase">{cert.year}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold border-l-4 border-cyan-500 pl-6 uppercase italic">About this certification</h3>
                            <p className="text-lg text-slate-300 leading-relaxed italic">
                                {cert.fullDescription}
                            </p>
                        </div>

                        <div className="pt-10 flex flex-col sm:flex-row gap-6">
                            <a
                                href={cert.verificationLink}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-8 py-4 rounded-2xl font-black uppercase text-sm flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20"
                            >
                                <ExternalLink size={20} /> Verify Credential
                            </a>
                            <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/5 px-6 py-4 rounded-2xl border border-emerald-500/20">
                                <CheckCircle2 size={24} />
                                <span className="font-bold uppercase text-xs">Authenticity Guaranteed</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative flex justify-center items-center animate-in fade-in slide-in-from-right duration-700">
                        <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2rem] overflow-hidden border-8 border-slate-900 shadow-2xl bg-slate-900">
                            <img
                                src={cert.image}
                                alt={cert.name}
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* Background glow */}
                        <div className="absolute -inset-10 bg-cyan-500/10 blur-[80px] rounded-full -z-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateDetail;
