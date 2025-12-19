import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import API_URL from '../../config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


const EducationManager = () => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({ year: '', degree: '', institution: '', description: '', stats: '' });

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['education'],
        queryFn: () => axios.get(`${API_URL}/api/education`).then(res => res.data)
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return axios.put(`${API_URL}/api/education/${isEditing}`, data);
            }
            return axios.post(`${API_URL}/api/education`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['education']);
            toast.success(isEditing ? 'Education item updated' : 'New education item added');
            setIsEditing(null);
            setFormData({ year: '', degree: '', institution: '', description: '', stats: '' });
        },
        onError: () => toast.error('Failed to save item')
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axios.delete(`${API_URL}/api/education/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['education']);
            toast.success('Item deleted successfully');
        },
        onError: () => toast.error('Failed to delete item')
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleEdit = (item) => {
        setIsEditing(item.id);
        setFormData(item);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Manage Education</h1>
            </div>

            {/* Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold mb-6 text-slate-700">{isEditing ? 'Edit Item' : 'Add New Item'}</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Year (e.g., 2018 - 2022)"
                        className="p-3 border rounded-lg outline-none focus:border-blue-500"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Degree"
                        className="p-3 border rounded-lg outline-none focus:border-blue-500"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Institution"
                        className="p-3 border rounded-lg outline-none focus:border-blue-500"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Stats (e.g., GPA 3.8)"
                        className="p-3 border rounded-lg outline-none focus:border-blue-500"
                        value={formData.stats}
                        onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        className="p-3 border rounded-lg outline-none focus:border-blue-500 md:col-span-2 h-24"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <div className="md:col-span-2 flex justify-end gap-3">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => { setIsEditing(null); setFormData({ year: '', degree: '', institution: '', description: '', stats: '' }); }}
                                className="px-6 py-2 border rounded-lg hover:bg-slate-50 flex items-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-bold transition-all"
                        >
                            {isEditing ? <Check size={18} /> : <Plus size={18} />}
                            {isEditing ? 'Update Item' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Year</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Degree & Institution</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm">{item.year}</td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-800">{item.degree}</p>
                                    <p className="text-sm text-slate-500">{item.institution}</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EducationManager;
