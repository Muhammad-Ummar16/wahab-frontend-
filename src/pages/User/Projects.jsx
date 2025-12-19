import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import API_URL from '../../config';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/projects`);
                setProjects(res.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <section id="projects" className="pt-32 pb-20 bg-transparent font-sans text-white min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-cyan-400 font-mono tracking-widest text-sm md:text-base uppercase">Portfolio</h2>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black italic">Recent <span className="text-cyan-500">Projects</span></h1>
                    <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base">A selection of my professional work in social strategy, content creation, and analytics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all backdrop-blur-sm">
                            <div className="p-8 space-y-4">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold group-hover:text-cyan-400 transition-colors uppercase italic">{project.title}</h3>
                                <p className="text-slate-400 text-sm md:text-base leading-relaxed line-clamp-4">
                                    {project.description}
                                </p>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
                                    >
                                        <ExternalLink size={14} /> View Project Details
                                    </a>
                                )}
                            </div>

                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-colors"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
