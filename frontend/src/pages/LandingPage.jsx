import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Zap, Shield, Camera, MapPin, BarChart3, Bell,
    ArrowRight, Activity, Eye, Users, TrendingUp,
    ChevronDown
} from 'lucide-react';

// Animated counter hook
function useCounter(end, duration = 2000, startWhenVisible = true) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(!startWhenVisible);
    const ref = useRef(null);

    useEffect(() => {
        if (!startWhenVisible) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStarted(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startWhenVisible]);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [started, end, duration]);

    return { count, ref };
}

// Floating particle component
function Particles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full opacity-20"
                    style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6',
                        animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 4}s`,
                    }}
                />
            ))}
        </div>
    );
}

// Feature card
function FeatureCard({ icon: Icon, title, description, color, delay }) {
    return (
        <div
            className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 cursor-default"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color}08, transparent 40%)` }}
            />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border`}
                style={{ background: `${color}15`, borderColor: `${color}30` }}>
                <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
}

export default function LandingPage() {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    const stat1 = useCounter(2847, 2500);
    const stat2 = useCounter(94, 2000);
    const stat3 = useCounter(12, 1500);
    const stat4 = useCounter(340, 2000);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

            {/* ===== NAVBAR ===== */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 p-1.5 rounded-lg">
                            <Zap className="w-5 h-5 text-white" fill="white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">Urban Pulse AI</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#stats" className="hover:text-white transition-colors">Impact</a>
                        <a href="#how" className="hover:text-white transition-colors">How It Works</a>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                    >
                        Open Dashboard
                    </button>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <section className="relative min-h-screen flex items-center justify-center pt-16">
                <Particles />

                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none"
                    style={{ transform: `translateY(${scrollY * -0.08}px)` }} />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-500/8 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">AI-Powered Infrastructure Intelligence</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in-up">
                        Predict Urban Decay
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Before It Happens
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay">
                        Urban Pulse AI monitors your city's infrastructure in real-time,
                        predicting failures before they become emergencies. Turn reactive maintenance
                        into <span className="text-white font-medium">proactive intelligence</span>.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-2">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] flex items-center gap-2"
                        >
                            Launch Live Dashboard
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-gray-300 hover:text-white font-medium px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
                        >
                            See How It Works
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Mini stats row under hero */}
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-gray-500 animate-fade-in-up-delay-2">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-500" />
                            <span>Real-time Monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>AI Vision Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-violet-500" />
                            <span>Predictive Alerts</span>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section id="features" className="relative py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">Core Capabilities</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Everything You Need to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Protect Your City</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <FeatureCard
                            icon={TrendingUp}
                            title="Predictive Analytics"
                            description="AI clusters incident data and calculates Risk Scores to predict failure zones before they become critical."
                            color="#10b981"
                            delay={0}
                        />
                        <FeatureCard
                            icon={Camera}
                            title="Citizen Reporting"
                            description="Citizens upload photos of urban issues. Our AI instantly classifies and prioritizes each report."
                            color="#3b82f6"
                            delay={100}
                        />
                        <FeatureCard
                            icon={Bell}
                            title="Smart Alerts"
                            description="City officials receive a real-time feed of predicted and reported alerts, sorted by severity."
                            color="#f59e0b"
                            delay={200}
                        />
                        <FeatureCard
                            icon={MapPin}
                            title="Live Heatmap"
                            description="Interactive dark-mode map showing every incident, with predicted failure zones highlighted in red."
                            color="#8b5cf6"
                            delay={300}
                        />
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section id="stats" className="relative py-24 px-6">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent pointer-events-none" />
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Measurable Impact</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Numbers That Speak</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div ref={stat1.ref} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                {stat1.count.toLocaleString()}
                            </div>
                            <p className="text-sm text-gray-500">Incidents Detected</p>
                        </div>
                        <div ref={stat2.ref} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
                                {stat2.count}%
                            </div>
                            <p className="text-sm text-gray-500">Prediction Accuracy</p>
                        </div>
                        <div ref={stat3.ref} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                                {stat3.count}min
                            </div>
                            <p className="text-sm text-gray-500">Avg. Response Time</p>
                        </div>
                        <div ref={stat4.ref} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                {stat4.count}K
                            </div>
                            <p className="text-sm text-gray-500">Citizens Protected</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section id="how" className="relative py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Simple Process</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How Urban Pulse Works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                icon: BarChart3,
                                title: 'Data Ingestion',
                                description: 'Sensor data and citizen reports continuously flow into our AI engine from across the city.',
                                gradient: 'from-emerald-500 to-cyan-500'
                            },
                            {
                                step: '02',
                                icon: Zap,
                                title: 'AI Analysis',
                                description: 'Our models cluster incidents, classify images, and calculate risk scores in real-time.',
                                gradient: 'from-blue-500 to-violet-500'
                            },
                            {
                                step: '03',
                                icon: Shield,
                                title: 'Proactive Response',
                                description: 'City officials receive smart alerts and can dispatch crews before emergencies escalate.',
                                gradient: 'from-violet-500 to-pink-500'
                            }
                        ].map((item) => (
                            <div key={item.step} className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300">
                                <div className={`text-6xl font-black bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent opacity-20 absolute top-4 right-6`}>
                                    {item.step}
                                </div>
                                <item.icon className="w-8 h-8 text-gray-400 mb-5" />
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="relative py-32 px-6">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Ready to See Your City's <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Pulse</span>?
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        Explore the live dashboard with real-time data, AI predictions, and citizen reports.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold px-10 py-5 rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] text-lg flex items-center gap-3 mx-auto"
                    >
                        Launch Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="border-t border-white/5 py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-500" />
                        <span>Urban Pulse AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Built for Smart Cities Hackathon 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
