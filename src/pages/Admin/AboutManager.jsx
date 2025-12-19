import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';
import API_URL from '../../config';

const AboutManager = () => {
    const [formData, setFormData] = useState({
        mission: '',
        vision: '',
        bio1: '',
        bio2: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/about`);
                setFormData(res.data);
            } catch (error) {
                console.error("Error fetching about data:", error);
                toast.error("Failed to load about data");
            } finally {
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put(`${API_URL}/api/about`, formData);
            toast.success('About section updated!');
        } catch (error) {
            console.error("Error updating about:", error);
            toast.error('Update failed.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return null;

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Manage About Content</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-700 border-b pb-2 italic">General Biography</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Intro Paragraph</label>
                            <textarea
                                className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all h-28"
                                value={formData.bio1}
                                onChange={(e) => setFormData({ ...formData, bio1: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Secondary Paragraph</label>
                            <textarea
                                className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all h-32"
                                value={formData.bio2}
                                onChange={(e) => setFormData({ ...formData, bio2: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Our Mission</h3>
                        <textarea
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 h-24"
                            value={formData.mission}
                            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Our Vision</h3>
                        <textarea
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500 h-24"
                            value={formData.vision}
                            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2 border-t pt-8">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Profile Image URL</label>
                    <input
                        type="text"
                        className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-slate-900 text-white px-10 py-4 rounded-xl hover:bg-slate-800 flex items-center gap-3 font-black uppercase tracking-widest transition-all disabled:opacity-50"
                    >
                        <Save size={20} />
                        {saving ? 'Updating...' : 'Update About Section'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AboutManager;
