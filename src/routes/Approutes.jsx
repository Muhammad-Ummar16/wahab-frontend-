import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "../Layout/UserLayout";
import AdminLayout from "../Layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import EducationManager from "../pages/Admin/EducationManager";
import SkillsManager from "../pages/Admin/SkillsManager";
import ProjectManager from "../pages/Admin/ProjectManager";
import HeroManager from "../pages/Admin/HeroManager";
import AboutManager from "../pages/Admin/AboutManager";
import ContactManager from "../pages/Admin/ContactManager";
import CertificatesManager from "../pages/Admin/CertificatesManager";

// User Pages
import Home from "../pages/User/Home";
import About from "../pages/User/About";
import Education from "../pages/User/Education";
import Skills from "../pages/User/Skills";
import Contact from "../pages/User/Contact";
import Projects from "../pages/User/Projects";
import Certificates from "../pages/User/Certificates";
import CertificateDetail from "../pages/User/CertificateDetail";

const Approutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* User Routes */}
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    {/* Detail pages can remain if needed for deep linking, but core sections are on Home */}
                    <Route path="certificates/:id" element={<CertificateDetail />} />
                </Route>

                {/* Admin Auth */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<AdminDashboard />} />
                    <Route path="hero" element={<HeroManager />} />
                    <Route path="about" element={<AboutManager />} />
                    <Route path="education" element={<EducationManager />} />
                    <Route path="skills" element={<SkillsManager />} />
                    <Route path="projects" element={<ProjectManager />} />
                    <Route path="certifications" element={<CertificatesManager />} />
                    <Route path="contact" element={<ContactManager />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Approutes;
