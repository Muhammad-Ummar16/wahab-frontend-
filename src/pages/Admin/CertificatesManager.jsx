import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, X, Check, Upload, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import API_URL from '../../config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const CertificatesManager = () => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        issuer: '',
        year: '',
        image: '',
        fullDescription: '',
        verificationLink: ''
    });
    const [uploading, setUploading] = useState(false);

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['certifications'],
        queryFn: () => axios.get(`${API_URL}/api/certifications`).then(res => res.data)
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return axios.put(`${API_URL}/api/certifications/${isEditing}`, data);
            }
            return axios.post(`${API_URL}/api/certifications`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['certifications']);
            toast.success(isEditing ? 'Certification updated' : 'New certification added');
            setIsEditing(null);
            setFormData({
                name: '',
                issuer: '',
                year: '',
                image: '',
                fullDescription: '',
                verificationLink: ''
            });
        },
        onError: () => toast.error('Failed to save item')
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axios.delete(`${API_URL}/api/certifications/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['certifications']);
            toast.success('Deleted successfully');
        },
        onError: () => toast.error('Failed to delete')
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('oldUrl', formData.image || '');

        try {
            const res = await axios.post(`${API_URL}/api/upload`, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({ ...prev, image: res.data.url }));
            toast.success("Certificate image uploaded!");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleEdit = (item) => {
        setIsEditing(item.id);
        setFormData(item);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this certification?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-tight">Manage Certifications</h1>
            </div>

            {/* Form Card */}
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-slate-700 flex items-center gap-2">
                    <Award className="text-cyan-500" size={20} />
                    {isEditing ? 'Edit Certification' : 'Add New Certification'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Certificate Name</label>
                            <input
                                type="text"
                                className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Google Social Media Marketing"
                                required
                            />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Issuer</label>
                            <input
                                type="text"
                                className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-sm"
                                value={formData.issuer}
                                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                placeholder="e.g. Google / Coursera"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Year</label>
                            <input
                                type="text"
                                className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-sm"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                placeholder="e.g. 2023"
                                required
                            />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Verification Link (Optional)</label>
                            <input
                                type="text"
                                className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono text-xs md:text-sm"
                                value={formData.verificationLink}
                                onChange={(e) => setFormData({ ...formData, verificationLink: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Full Description</label>
                        <textarea
                            className="w-full p-2.5 md:p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all h-24 md:h-32 text-sm"
                            value={formData.fullDescription}
                            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                            placeholder="Describe what you learned or achieved..."
                            required
                        />
                    </div>

                    {/* Image Upload Area */}
                    <div className="p-4 md:p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white border border-slate-200 overflow-hidden flex-shrink-0 shadow-inner">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <Award size={32} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-2 md:space-y-3 w-full">
                            <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Certificate Image</label>
                            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                                <input
                                    type="text"
                                    className="flex-1 p-2.5 md:p-3 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 font-mono text-[10px] md:text-xs"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="Image URL"
                                />
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="cert-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                    <label
                                        htmlFor="cert-upload"
                                        className={`flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-white border-2 border-dashed border-slate-300 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all cursor-pointer text-slate-500 font-bold text-xs md:text-sm whitespace-nowrap ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        <Upload size={16} />
                                        {uploading ? 'Uploading...' : 'Upload Image'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 md:gap-3 pt-2 md:pt-4">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(null);
                                    setFormData({
                                        name: '',
                                        issuer: '',
                                        year: '',
                                        image: '',
                                        fullDescription: '',
                                        verificationLink: ''
                                    });
                                }}
                                className="px-6 py-3 md:px-8 md:py-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-cyan-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-xl hover:bg-cyan-700 flex items-center gap-2 md:gap-3 font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-600/20 active:scale-95 text-xs md:text-sm"
                        >
                            {isEditing ? <Check size={18} /> : <Plus size={18} />}
                            {isEditing ? 'Update' : 'Add Certificate'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-900 border-b border-slate-800">
                        <tr>
                            <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Year</th>
                            <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Certificate & Issuer</th>
                            <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-8 py-10 text-center text-slate-400 italic">No certifications added yet.</td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-6 font-mono font-bold text-cyan-600 text-sm">{item.year}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 uppercase tracking-tight text-sm">{item.name}</p>
                                                <p className="text-xs text-slate-500 font-bold">{item.issuer}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-3 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {items.length === 0 ? (
                    <div className="text-center text-slate-400 italic py-8 bg-white rounded-xl border border-slate-200">No certifications yet.</div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="flex gap-4 items-start">
                                <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 pr-16">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-600 px-1.5 py-0.5 rounded">{item.year}</span>
                                    </div>
                                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight truncate">{item.name}</h4>
                                    <p className="text-xs text-slate-500 font-bold">{item.issuer}</p>
                                </div>
                            </div>

                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 text-slate-400 hover:text-cyan-600 bg-slate-50 rounded-lg transition-all"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 rounded-lg transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CertificatesManager;
