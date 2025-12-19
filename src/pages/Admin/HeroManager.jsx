import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';


import { Save, Upload } from 'lucide-react';
const HeroManager = () => {
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState({ image: false, cv: false });

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/hero`);
                setFormData(res.data);
            } catch (error) {
                console.error("Error fetching hero data:", error);
                toast.error("Failed to load hero data");
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put(`${API_URL}/api/hero`, formData);
            toast.success('Hero section updated!');
        } catch (error) {
            console.error("Error updating hero:", error);
            toast.error('Failed to update hero section.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return null;

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Manage Hero Section</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">First Name</label>
                        <input
                            type="text"
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Last Name</label>
                        <input
                            type="text"
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Professional Role</label>
                    <input
                        type="text"
                        className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Short Bio / Description</label>
                    <textarea
                        className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all h-32"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Experience Stats (e.g., 5+)</label>
                        <input
                            type="text"
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Projects Done (e.g., 100+)</label>
                        <input
                            type="text"
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                            value={formData.projects}
                            onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-1">Visual Assets & Documents</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Upload */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center justify-between">
                                Profile Image URL
                                <span className="text-cyan-600 normal-case font-normal">(Auto-updates on upload)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 transition-all font-mono text-xs bg-slate-50"
                                value={formData.image}
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
                                    className={`flex items-center justify-center gap-2 w-full p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all cursor-pointer text-slate-500 font-bold text-sm ${uploading.image ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <Upload size={18} />
                                    {uploading.image ? 'Uploading Image...' : 'Upload New Image'}
                                </label>
                            </div>
                        </div>

                        {/* CV Upload */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center justify-between">
                                Downloadable CV URL
                                <span className="text-cyan-600 normal-case font-normal">(PDF recommended)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 transition-all font-mono text-xs bg-slate-50"
                                value={formData.cvUrl}
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
                                    className={`flex items-center justify-center gap-2 w-full p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all cursor-pointer text-slate-500 font-bold text-sm ${uploading.cv ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <Upload size={18} />
                                    {uploading.cv ? 'Uploading CV...' : 'Upload CV Document'}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 block">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-cyan-600 text-white px-10 py-4 rounded-xl hover:bg-cyan-700 flex items-center gap-3 font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-cyan-600/20 active:scale-95"
                    >
                        <Save size={20} />
                        {saving ? 'Saving Changes...' : 'Save All Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeroManager;
