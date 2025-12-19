import React from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';
import API_URL from '../../config';
import { useQuery } from '@tanstack/react-query';

const AdminDashboard = () => {
    const { data: eduData } = useQuery({ queryKey: ['education'], queryFn: () => axios.get(`${API_URL}/api/education`).then(r => r.data) });
    const { data: skillsData } = useQuery({ queryKey: ['skills'], queryFn: () => axios.get(`${API_URL}/api/skills`).then(r => r.data) });
    const { data: certsData } = useQuery({ queryKey: ['certifications'], queryFn: () => axios.get(`${API_URL}/api/certifications`).then(r => r.data) });

    const stats = {
        education: (eduData || []).length,
        skills: (skillsData || []).length,
        certifications: (certsData || []).length
    };

    const cards = [
        { name: 'Education Items', value: stats.education, color: 'bg-blue-500' },
        { name: 'Skill Categories', value: stats.skills, color: 'bg-cyan-500' },
        { name: 'Certifications', value: stats.certifications, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{card.name}</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{card.value}</p>
                        </div>
                        <div className={`h-12 w-12 rounded-lg ${card.color} opacity-20`}></div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Quick Tip</h3>
                <p className="text-slate-600 leading-relaxed">
                    This admin panel allows you to manage all your portfolio content dynamically. Any changes you make here will be saved to your local JSON files and reflected on your live site immediately after a refresh.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
