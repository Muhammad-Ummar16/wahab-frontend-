import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Save, Upload } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API_URL from '../../config';

const HeroManager = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        role: '',
        description: '',
        experience: '',
        projects: '',
        image: '',
        cvUrl: ''
    });
    const [uploading, setUploading] = useState({ image: false, cv: false });

    const { isLoading } = useQuery({
        queryKey: ['hero'],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/api/hero`);
            const data = Array.isArray(res.data) ? res.data[0] : res.data;
            if (data) setFormData(data);
            return data;
        },
    });

    const mutation = useMutation({
        mutationFn: (data) => axios.put(`${API_URL}/api/hero`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['hero']);
            toast.success('Hero section updated!');
        },
        onError: () => toast.error('Failed to update hero section.')
    });

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const oldUrl = type === 'image' ? formData.image : formData.cvUrl;

        setUploading(prev => ({ ...prev, [type]: true }));
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('oldUrl', oldUrl || '');

        try {
            const res = await axios.post(`${API_URL}/api/upload`, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({ ...prev, [type === 'image' ? 'image' : 'cvUrl']: res.data.url }));
            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(`Failed to upload ${type}`);
        } finally {
            setUploading(prev => ({ ...prev, [type]: false }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <div className="max-w-4xl space-y-6 md:space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-tight">Manage Hero Section</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest px-1">First Name</label>
                        <input
                            type="text"
                            className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-sm"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Last Name</label>
                        <input
                            type="text"
                            className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-sm"
                            value={formData.lastName || ''}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Professional Role</label>
                    <input
                        type="text"
                        className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-sm"
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Short Bio / Description</label>
                    <textarea
                        className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all h-24 md:h-32 text-sm"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-t border-slate-100 pt-4 md:pt-6">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Experience Stats (e.g., 5+)</label>
                        <input
                            type="text"
                            className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-sm"
                            value={formData.experience || ''}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Projects Done (e.g., 100+)</label>
                        <input
                            type="text"
                            className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-sm"
                            value={formData.projects || ''}
                            onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-3 md:space-y-4 pt-2 md:pt-4 border-t border-slate-100">
                    <h3 className="text-xs md:text-sm font-bold text-slate-800 uppercase tracking-widest px-1">Visual Assets & Documents</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Image Upload */}
                        <div className="space-y-2 md:space-y-3">
                            <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center justify-between">
                                Profile Image URL
                                <span className="text-cyan-600 normal-case font-normal">(Auto-updates on upload)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 transition-all font-mono text-xs bg-slate-50"
                                value={formData.image || ''}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="Paste image URL or upload below"
                            />
                            <div className="relative">
                                <input
                                    type="file"
                                    id="profile-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'image')}
                                />
                                <label
                                    htmlFor="profile-upload"
                                    className={`flex items-center justify-center gap-2 w-full p-2.5 md:p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all cursor-pointer text-slate-500 font-bold text-xs md:text-sm ${uploading.image ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <Upload size={16} />
                                    {uploading.image ? 'Uploading Image...' : 'Upload New Image'}
                                </label>
                            </div>
                        </div>

                        {/* CV Upload */}
                        <div className="space-y-2 md:space-y-3">
                            <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center justify-between">
                                Downloadable CV URL
                                <span className="text-cyan-600 normal-case font-normal">(PDF recommended)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 transition-all font-mono text-xs bg-slate-50"
                                value={formData.cvUrl || ''}
                                onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                                placeholder="Paste CV link or upload below"
                            />
                            <div className="relative">
                                <input
                                    type="file"
                                    id="cv-upload"
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => handleFileUpload(e, 'cv')}
                                />
                                <label
                                    htmlFor="cv-upload"
                                    className={`flex items-center justify-center gap-2 w-full p-2.5 md:p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all cursor-pointer text-slate-500 font-bold text-xs md:text-sm ${uploading.cv ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <Upload size={16} />
                                    {uploading.cv ? 'Uploading CV...' : 'Upload CV Document'}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 md:pt-8 block">
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="bg-cyan-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-xl hover:bg-cyan-700 flex items-center gap-2 md:gap-3 font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-cyan-600/20 active:scale-95 text-xs md:text-sm"
                    >
                        <Save size={18} />
                        {mutation.isPending ? 'Saving...' : 'Save All Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeroManager;
