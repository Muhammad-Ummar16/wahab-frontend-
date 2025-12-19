import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, X, Check, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import API_URL from '../../config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ProjectManager = () => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({ title: '', category: '', description: '', link: '' });

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: () => axios.get(`${API_URL}/api/projects`).then(res => res.data)
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return axios.put(`${API_URL}/api/projects/${isEditing}`, data);
            }
            return axios.post(`${API_URL}/api/projects`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success(isEditing ? 'Project updated' : 'New project added');
            setIsEditing(null);
            setFormData({ title: '', category: '', description: '', link: '' });
        },
        onError: () => toast.error('Could not save project')
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axios.delete(`${API_URL}/api/projects/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success('Project deleted');
        },
        onError: () => toast.error('Failed to delete project')
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleEdit = (project) => {
        setIsEditing(project.id);
        setFormData(project);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this project?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-800">Manage Projects</h1>

            {/* Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold mb-6 text-slate-700">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Project Title"
                        className="p-3 border rounded-lg outline-none focus:border-cyan-500"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category (e.g., Social Strategy)"
                        className="p-3 border rounded-lg outline-none focus:border-cyan-500"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Live Link / Case Study URL"
                        className="p-3 border rounded-lg outline-none focus:border-cyan-500 md:col-span-2"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                    <textarea
                        placeholder="Project Description"
                        className="p-3 border rounded-lg outline-none focus:border-cyan-500 md:col-span-2 h-24"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <div className="md:col-span-2 flex justify-end gap-3">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => { setIsEditing(null); setFormData({ title: '', category: '', description: '', link: '' }); }}
                                className="px-6 py-2 border rounded-lg hover:bg-slate-50 flex items-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 flex items-center gap-2 font-bold transition-all"
                        >
                            {isEditing ? <Check size={18} /> : <Plus size={18} />}
                            {isEditing ? 'Update Project' : 'Add Project'}
                        </button>
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 bg-slate-50 rounded"
                            >
                                <Edit2 size={14} />
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                            {project.category}
                        </span>
                        <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">{project.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-4">{project.description}</p>
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-cyan-600 transition-colors">
                                <ExternalLink size={12} /> View Project
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectManager;
