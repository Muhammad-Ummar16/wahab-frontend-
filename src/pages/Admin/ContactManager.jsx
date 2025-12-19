import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';

import { Mail, Phone, Linkedin, Save, MessageCircle, MapPin } from 'lucide-react';
const ContactManager = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        linkedin: '',
        whatsapp: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/contact`);
                setFormData(res.data);
            } catch (error) {
                console.error("Error fetching contact data:", error);
                toast.error("Failed to load contact data");
            } finally {
                setLoading(false);
            }
        };
        fetchContact();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put(`${API_URL}/api/contact`, formData);
            toast.success('Contact info updated!');
        } catch (error) {
            console.error("Error updating contact:", error);
            toast.error('Failed to update.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return null;

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Manage Contact Info</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Mail size={14} className="text-cyan-500" /> Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Phone size={14} className="text-cyan-500" /> Phone Number
                        </label>
                        <input
                            type="text"
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Linkedin size={14} className="text-cyan-500" /> LinkedIn URL
                        </label>
                        <input
                            type="text"
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <MessageCircle size={14} className="text-cyan-500" /> WhatsApp Link
                        </label>
                        <input
                            type="text"
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={14} className="text-cyan-500" /> Physical Address
                    </label>
                    <input
                        type="text"
                        className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-cyan-500"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-cyan-600 text-white px-10 py-4 rounded-xl hover:bg-cyan-700 flex items-center gap-3 font-black uppercase tracking-widest transition-all shadow-lg"
                    >
                        <Save size={20} />
                        {saving ? 'Updating...' : 'Update Contact Info'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactManager;
