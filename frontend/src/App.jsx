import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import axios from 'axios';
import MapDashboard from './components/MapDashboard';
import SmartAlertsSidebar from './components/SmartAlertsSidebar';
import CitizenUpload from './components/CitizenUpload';
import { Camera, Zap, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const navigate = useNavigate();
    const [showUpload, setShowUpload] = useState(false);
    const [incidents, setIncidents] = useState([]);
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/heatmap-data');
                setIncidents(res.data.incidents || []);
                setPredictions(res.data.predictions || []);
            } catch (err) {
                console.error("Backend not running, using empty data:", err.message);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: '#0a0a0f', color: 'white' }}>
            {/* Sidebar */}
            <div style={{ width: '320px', flexShrink: 0, zIndex: 20 }}>
                <SmartAlertsSidebar
                    incidents={incidents}
                    predictions={predictions}
                    onSelectAlert={(a) => console.log("Selected:", a)}
                />
            </div>

            {/* Main */}
            <div style={{ flex: 1, position: 'relative' }}>
                <MapDashboard incidents={incidents} predictions={predictions} />

                {/* Top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'none', zIndex: 10 }}>
                    <div style={{ pointerEvents: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{ background: 'rgba(30,30,30,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 16px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
                        >
                            <ArrowLeft style={{ width: 16, height: 16 }} />
                            Back
                        </button>
                        <div style={{ background: 'rgba(30,30,30,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                            <div style={{ background: '#10b981', padding: '6px', borderRadius: '8px' }}>
                                <Zap style={{ width: 20, height: 20, color: 'white', fill: 'white' }} />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, lineHeight: 1.2 }}>Urban Pulse AI</h1>
                                <p style={{ fontSize: '11px', color: '#10b981', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Live Infrastructure Grid</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ pointerEvents: 'auto' }}>
                        <button
                            onClick={() => setShowUpload(!showUpload)}
                            style={{ background: '#2563eb', border: '1px solid rgba(96,165,250,0.5)', borderRadius: '12px', padding: '12px 20px', color: 'white', cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 20px rgba(37,99,235,0.4)', fontSize: '14px' }}
                        >
                            <Camera style={{ width: 18, height: 18 }} />
                            Report Issue
                        </button>
                    </div>
                </div>

                {/* Upload Modal */}
                {showUpload && (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                        <div
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                            onClick={() => setShowUpload(false)}
                        />
                        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '448px' }}>
                            <CitizenUpload onClose={() => setShowUpload(false)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    );
}
