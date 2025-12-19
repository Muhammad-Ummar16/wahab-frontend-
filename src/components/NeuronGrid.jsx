import { useEffect, useRef } from "react";

const NeuronGrid = ({ isDark, mouseX, mouseY }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // Config
        const particleCount = 150; // Reduced for performance
        const connectionDistance = 140;
        const mouseDistance = 200;

        // Colors
        const nodeColor = isDark ? "rgba(100, 200, 255, 0.8)" : "rgba(30, 30, 30, 0.6)";
        const lineStroke = isDark ? "rgba(100, 200, 255, " : "rgba(0, 50, 200, "; // Dynamic alpha handled later

        let width, height;
        let particles = [];
        let mousePos = { x: null, y: null };

        // Sync with motion values smoothly
        const unsubscribeX = mouseX.on("change", (v) => { mousePos.x = v; });
        const unsubscribeY = mouseY.on("change", (v) => { mousePos.y = v; });

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    baseSize: Math.random() * 1.5 + 1,
                    angle: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.03 + Math.random() * 0.02,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections first (layering)
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        const alpha = (1 - dist / connectionDistance) * 0.15;
                        ctx.strokeStyle = lineStroke + alpha + ")";
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Mouse connections
                if (mousePos.x !== null) {
                    const dx = mousePos.x - p1.x;
                    const dy = mousePos.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectionDistance * 1.5) {
                        ctx.beginPath();
                        const alpha = (1 - dist / (connectionDistance * 1.5)) * 0.2;
                        ctx.strokeStyle = lineStroke + alpha + ")";
                        ctx.moveTo(mousePos.x, mousePos.y);
                        ctx.lineTo(p1.x, p1.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                p.angle += p.pulseSpeed;
                const sizePulse = Math.sin(p.angle) * 0.4;
                const currentSize = Math.max(0.5, p.baseSize + sizePulse);

                // Magnetic pull
                if (mousePos.x !== null) {
                    const dx = mousePos.x - p.x;
                    const dy = mousePos.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouseDistance) {
                        const force = (mouseDistance - dist) / mouseDistance;
                        p.vx += (dx / dist) * force * 0.02;
                        p.vy += (dy / dist) * force * 0.02;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            unsubscribeX();
            unsubscribeY();
        };
    }, [isDark, mouseX, mouseY]);

    return <canvas ref={canvasRef} className="hidden md:block fixed inset-0 w-full h-full pointer-events-none -z-10" />;
};

export default NeuronGrid;
