import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, X, Check, Layers } from 'lucide-react';
import toast from 'react-hot-toast';
import API_URL from '../../config';

const SkillsManager = () => {
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({ title: '', skills: [] });
    const [newSkill, setNewSkill] = useState({ name: '', level: 80 });

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/skills`);
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/api/skills/${isEditing}`, formData);
                toast.success('Skill category updated');
            } else {
                await axios.post(`${API_URL}/api/skills`, formData);
                toast.success('New category created');
            }
            setIsEditing(null);
            setFormData({ title: '', skills: [] });
            fetchCategories();
        } catch (error) {
            console.error("Error saving skill category:", error);
            toast.error('Failed to save category');
        }
    };

    const handleEdit = (category) => {
        setIsEditing(category.id);
        setFormData(category);
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm("Delete this entire category?")) {
            try {
                await axios.delete(`${API_URL}/api/skills/${id}`);
                fetchCategories();
                toast.success('Category removed');
            } catch (error) {
                toast.error('Failed to delete category');
            }
        }
    };

    const addSkillToCategory = () => {
        if (!newSkill.name) return;
        setFormData({
            ...formData,
            skills: [...formData.skills, newSkill]
        });
        setNewSkill({ name: '', level: 80 });
    };

    const removeSkillFromCategory = (index) => {
        const updatedSkills = [...formData.skills];
        updatedSkills.splice(index, 1);
        setFormData({ ...formData, skills: updatedSkills });
    };

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-800">Manage Skills</h1>

            {/* Category Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold mb-6 text-slate-700">{isEditing ? 'Edit Category' : 'Create New Category'}</h3>
                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-500 uppercase">Category Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Marketing Tools"
                            className="p-3 border rounded-lg outline-none focus:border-cyan-500"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                        <label className="text-sm font-bold text-slate-500 uppercase block mb-4">Add Skills to Category</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Skill Name (e.g., SEO)"
                                className="p-2 border rounded-lg outline-none text-sm"
                                value={newSkill.name}
                                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            />
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    className="flex-1 accent-cyan-500"
                                    value={newSkill.level}
                                    onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                                />
                                <span className="text-xs font-mono w-8">{newSkill.level}%</span>
                            </div>
                            <button
                                type="button"
                                onClick={addSkillToCategory}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold"
                            >
                                <Plus size={16} /> Add Skill
                            </button>
                        </div>

                        {/* Temp Skills List */}
                        <div className="flex flex-wrap gap-2">
                            {formData.skills.map((s, si) => (
                                <div key={si} className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 border border-cyan-100">
                                    {s.name} ({s.level}%)
                                    <button onClick={() => removeSkillFromCategory(si)} className="hover:text-red-500">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        {isEditing && (
                            <button
                                onClick={() => { setIsEditing(null); setFormData({ title: '', skills: [] }); }}
                                className="px-6 py-2 border rounded-lg hover:bg-slate-50 flex items-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={!formData.title}
                            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 flex items-center gap-2 font-bold transition-all disabled:opacity-50"
                        >
                            {isEditing ? <Check size={18} /> : <Plus size={18} />}
                            {isEditing ? 'Update Category' : 'Save Category'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                                    <Layers size={20} />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">{cat.title}</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(cat)}
                                    className="text-slate-400 hover:text-blue-600 transition-colors"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(cat.id)}
                                    className="text-slate-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {cat.skills.map((s, si) => (
                                <div key={si} className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span>{s.name}</span>
                                        <span>{s.level}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${s.level}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsManager;
