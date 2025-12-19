import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Phone, Linkedin, Save, MessageCircle, MapPin } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API_URL from '../../config';
const ContactManager = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        linkedin: '',
        whatsapp: '',
        address: ''
    });

    const { isLoading } = useQuery({
        queryKey: ['contact'],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/api/contact`);
            const data = Array.isArray(res.data) ? res.data[0] : res.data;
            if (data) setFormData(data);
            return data;
        },
    });

    const mutation = useMutation({
        mutationFn: (data) => axios.put(`${API_URL}/api/contact`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['contact']);
            toast.success('Contact info updated!');
        },
        onError: () => toast.error('Failed to update.')
    });

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
                        disabled={mutation.isPending}
                        className="bg-cyan-600 text-white px-10 py-4 rounded-xl hover:bg-cyan-700 flex items-center gap-3 font-black uppercase tracking-widest transition-all shadow-lg"
                    >
                        <Save size={20} />
                        {mutation.isPending ? 'Updating...' : 'Update Contact Info'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactManager;
