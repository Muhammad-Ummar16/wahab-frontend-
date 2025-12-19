import React, { useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import NeuronGrid from "./NeuronGrid";

const GlobalBackground = () => {
    const isDark = true;

    // Mouse move effect for Orbs
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Base Grid Pattern - Slightly more visible */}
            <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:32px_32px] ${isDark ? "opacity-100" : "opacity-40"}`} />

            {/* Dynamic Background Orbs */}
            <BackgroundOrbs isDark={isDark} mouseX={mouseX} mouseY={mouseY} />

            {/* The Neuron Web Canvas */}
            <NeuronGrid isDark={isDark} mouseX={mouseX} mouseY={mouseY} />

            {/* Subtle Vignette */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,${isDark ? "rgba(10,10,10,0.5)" : "rgba(255,255,255,0.3)"}_100%)]`} />
        </div>
    );
};

const BackgroundOrbs = ({ isDark, mouseX, mouseY }) => {
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const x1 = useTransform(springX, [0, window.innerWidth], [-50, 50]);
    const y1 = useTransform(springY, [0, window.innerHeight], [-50, 50]);

    const x2 = useTransform(springX, [0, window.innerWidth], [50, -50]);
    const y2 = useTransform(springY, [0, window.innerHeight], [50, -50]);

    return (
        <>
            <motion.div
                style={{ x: x1, y: y1 }}
                className={`absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${isDark ? "bg-cyan-600" : "bg-cyan-400"
                    }`}
            />
            <motion.div
                style={{ x: x2, y: y2 }}
                className={`absolute bottom-[5%] right-[2%] w-[700px] h-[700px] rounded-full blur-[150px] opacity-20 ${isDark ? "bg-blue-600" : "bg-blue-400"
                    }`}
            />
            <motion.div
                style={{ x: x1, y: y2 }}
                className={`absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 ${isDark ? "bg-purple-600" : "bg-purple-400"
                    }`}
            />
        </>
    );
};

export default GlobalBackground;
